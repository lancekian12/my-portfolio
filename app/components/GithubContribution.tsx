"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type Contribution = {
  date: string; // "YYYY-MM-DD"
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};
type Cell = Contribution | null;

const GithubContributions = ({ username = "lancekian12" }: { username?: string }) => {
  // data
  const [weeks, setWeeks] = useState<Cell[][]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // refs
  const outerScrollRef = useRef<HTMLDivElement | null>(null); // scroll viewport (relative)
  const innerRef = useRef<HTMLDivElement | null>(null); // inner content (columns)
  const gridRef = useRef<HTMLDivElement | null>(null); // grid element (for measuring a cell)
  const legendRef = useRef<HTMLDivElement | null>(null); // legend element

  // measurement / positioning
  const [colFullPx, setColFullPx] = useState<number | null>(null);
  const [legendSize, setLegendSize] = useState({ w: 0, h: 0 });
  const [legendPos, setLegendPos] = useState({ left: 0, top: 0 });

  // visuals
  const colors = [
    "bg-slate-100 dark:bg-slate-800",
    "bg-slate-300 dark:bg-slate-700",
    "bg-slate-400 dark:bg-slate-600",
    "bg-slate-600 dark:bg-slate-400",
    "bg-slate-900 dark:bg-slate-100",
  ];

  // today in UTC ISO
  const now = new Date();
  const todayIso = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  )
    .toISOString()
    .slice(0, 10);

  /* ----------------- fetch contributions ----------------- */
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const thisYear = now.getUTCFullYear();
        const start = new Date(Date.UTC(thisYear - 1, 2, 1)); // last March 1 (UTC)
        const end = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
        ); // exclusive

        const years = Array.from(
          new Set([start.getUTCFullYear(), end.getUTCFullYear()]),
        );
        const query = years.map((y) => `y=${y}`).join("&");
        const url = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
          username,
        )}?${query}`;

        const res = await fetch(url);
        const data = await res.json();

        if (!mounted) return;

        if (!data?.contributions) {
          setWeeks([]);
          setTotal(0);
          setLoading(false);
          return;
        }

        const map = new Map<string, Contribution>();
        for (const c of data.contributions as Contribution[])
          map.set(c.date, c);

        const dayList: Contribution[] = [];
        for (let d = new Date(start); d < end; d.setUTCDate(d.getUTCDate() + 1)) {
          const iso = d.toISOString().slice(0, 10);
          dayList.push(map.get(iso) ?? { date: iso, count: 0, level: 0 });
        }

        // pad until week-aligned (so first column is Sunday)
        const firstWeekday = start.getUTCDay(); // 0..6
        const padded: Cell[] = [];
        for (let i = 0; i < firstWeekday; i++) padded.push(null);
        for (const dd of dayList) padded.push(dd);
        while (padded.length % 7 !== 0) padded.push(null);

        // build weeks (columns)
        const weeksArr: Cell[][] = [];
        for (let i = 0; i < padded.length; i += 7) {
          weeksArr.push(padded.slice(i, i + 7));
        }

        // TRIM columns after today's column so grid stops at current date
        const todayColumn = weeksArr.findIndex((week) =>
          week.some((c) => c?.date === todayIso),
        );
        const trimmedWeeks =
          todayColumn !== -1 ? weeksArr.slice(0, todayColumn + 1) : weeksArr;

        const sum = dayList.reduce((s, c) => s + (c?.count ?? 0), 0);

        setWeeks(trimmedWeeks);
        setTotal(sum);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch contributions", err);
        if (!mounted) return;
        setWeeks([]);
        setTotal(0);
        setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ----------------- month labels ----------------- */
  const monthLabels = React.useMemo(() => {
    const labels: { col: number; text: string }[] = [];
    let lastMonth = -1;
    for (let col = 0; col < weeks.length; col++) {
      const week = weeks[col];
      const firstCell = week.find((c) => c !== null) as Contribution | undefined;
      if (!firstCell) continue;
      const dt = new Date(firstCell.date + "T00:00:00Z");
      const m = dt.getUTCMonth();
      if (m !== lastMonth) {
        labels.push({ col, text: dt.toLocaleString(undefined, { month: "short" }) });
        lastMonth = m;
      }
    }
    return labels;
  }, [weeks]);

  /* ----------------- measurement: cell, legend, inner bounding ----------------- */
  useLayoutEffect(() => {
    if (!gridRef.current || !outerScrollRef.current) return;

    // measure a cell and column gap
    const gridEl = gridRef.current;
    const firstCell = gridEl.querySelector<HTMLElement>(".contrib-cell");
    if (!firstCell) return;

    const cellWidth = firstCell.offsetWidth;
    const cs = getComputedStyle(gridEl);
    const columnGap = parseFloat(cs.columnGap || cs.gap || "0");
    const colFull = Math.round(cellWidth + (isNaN(columnGap) ? 0 : columnGap));
    setColFullPx(colFull);

    // measure legend size (if available)
    if (legendRef.current) {
      const rect = legendRef.current.getBoundingClientRect();
      setLegendSize({ w: Math.ceil(rect.width), h: Math.ceil(rect.height) });
    }

    // set initial legend position (below inner content & at right edge)
    const container = outerScrollRef.current;
    const inner = innerRef.current;
    if (inner) {
      const paddingRight = 12; // horizontal gap from right edge
      const spacingBelow = 8; // vertical gap between grid and legend
      const left = Math.max(
        0,
        container.scrollLeft + container.clientWidth - (legendSize.w || 140) - paddingRight,
      );
      // compute top relative to container: inner.offsetTop + inner.height + spacing (so legend is below)
      const top = inner.offsetTop + inner.clientHeight + spacingBelow;
      setLegendPos({ left, top });
    }
  }, [weeks, legendSize.w]); // re-run when weeks render or legend size measured

  /* ----------------- helper ----------------- */
  const findColumnForIso = (iso: string) => weeks.findIndex((wk) => wk.some((c) => c?.date === iso));

  /* ----------------- auto-scroll to middle-of-month on first render ----------------- */
  useEffect(() => {
    if (colFullPx == null) return;
    const container = outerScrollRef.current;
    if (!container) return;

    const thisYear = now.getUTCFullYear();
    const midMonthIso = new Date(Date.UTC(thisYear, now.getUTCMonth(), 15)).toISOString().slice(0, 10);

    const midCol = findColumnForIso(midMonthIso);
    const todayCol = findColumnForIso(todayIso);

    const targetCol = midCol !== -1 ? midCol : todayCol !== -1 ? todayCol : weeks.length - 1;

    if (targetCol !== -1) {
      const desired = Math.max(
        0,
        targetCol * colFullPx - Math.round(container.clientWidth / 2) + Math.round(colFullPx / 2),
      );
      container.scrollLeft = desired;
    }
  }, [colFullPx, weeks]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ----------------- update legend position on scroll/resize ----------------- */
  useEffect(() => {
    const container = outerScrollRef.current;
    const inner = innerRef.current;
    const legendEl = legendRef.current;
    if (!container || !inner || !legendEl) return;

    let raf = 0;
    const paddingRight = 12;
    const spacingBelow = 8;

    const update = () => {
      const left = Math.max(0, container.scrollLeft + container.clientWidth - legendSize.w - paddingRight);
      const top = inner.offsetTop + inner.clientHeight + spacingBelow;
      setLegendPos({ left, top });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    const onResize = () => {
      // re-measure legend width then update
      if (legendRef.current) {
        const rect = legendRef.current.getBoundingClientRect();
        setLegendSize({ w: Math.ceil(rect.width), h: Math.ceil(rect.height) });
      }
      onScroll();
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // initial
    update();

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [legendSize.w, legendSize.h, weeks]);

  /* ----------------- early returns ----------------- */
  if (loading) return <div className="text-sm text-slate-400">Loading contributions…</div>;
  if (weeks.length === 0) return <div className="text-sm text-slate-400">No contribution data.</div>;

  /* ----------------- sizes ----------------- */
  const assumedColFull = colFullPx ?? 16;
  const contentWidthPx = weeks.length * assumedColFull;

  /* ----------------- render ----------------- */
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-wider text-slate-400 font-bold">GitHub Contributions</h2>
        <div className="text-sm text-slate-500">
          <span className="font-semibold">{total}</span>{" "}
          <span className="font-semibold">contributions in the last year</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        {/* outer scroll container: relative so legend absolute is positioned inside */}
        <div
          ref={outerScrollRef}
          className="overflow-x-auto -mx-4 px-4 pb-8 relative"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* inner content (columns only) */}
          <div ref={innerRef} style={{ width: contentWidthPx }} className="relative">
            {/* month labels row */}
            <div className="flex items-start pl-0">
              <div className="w-10" /> {/* left gutter for weekday labels */}
              <div
                className="inline-grid"
                style={{
                  gridAutoFlow: "column",
                  gridAutoColumns: `${assumedColFull}px`,
                  columnGap: 0,
                }}
              >
                {weeks.map((_, colIndex) => {
                  const label = monthLabels.find((m) => m.col === colIndex);
                  return (
                    <div key={`m-${colIndex}`} className="h-4 w-[1px] flex items-start justify-center">
                      {label ? <div className="text-[10px] text-slate-400 translate-x-10">{label.text}</div> : <div className="text-[10px]">&nbsp;</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-start gap-0 mt-1">
              {/* weekday labels */}
              <div className="w-5 flex flex-col justify-between text-[10px] text-slate-400">
                <div style={{ height: "0.9rem" }} />
                <div>Mon</div>
                <div style={{ height: "0.45rem" }} />
                <div>Wed</div>
                <div style={{ height: "0.45rem" }} />
                <div>Fri</div>
                <div style={{ height: "0.5rem" }} />
              </div>

              {/* grid */}
              <div
                style={{
                  display: "inline-grid",
                  gridAutoFlow: "column",
                  gridAutoColumns: `${assumedColFull}px`,
                  columnGap: 0,
                }}
              >
                <div
                  ref={gridRef}
                  className="grid grid-rows-7 grid-flow-col gap-1"
                  style={{ width: weeks.length * assumedColFull }}
                >
                  {weeks.map((week, colIndex) =>
                    week.map((cell, rowIndex) => {
                      const key = `${colIndex}-${rowIndex}`;
                      if (!cell) {
                        return <div key={key} className="w-3 h-3 rounded-sm bg-transparent contrib-cell" />;
                      }
                      const isToday = cell.date === todayIso;
                      const colorClass = colors[cell.level] ?? colors[0];
                      return (
                        <div
                          key={key}
                          className={`w-3 h-3 rounded-sm contrib-cell ${colorClass} ${isToday ? "ring-1 ring-offset-1 ring-sky-400 dark:ring-sky-300" : ""}`}
                          title={`${cell.count} contributions on ${cell.date}`}
                        />
                      );
                    }),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ---------- legend: absolutely positioned below the grid (not overlaying) ---------- */}
          <div
            ref={legendRef}
            className="z-30"
            style={{
              position: "absolute",
              left: `${legendPos.left}px`,
              top: `${legendPos.top}px`,
              pointerEvents: "auto",
            }}
          >
            <div className="flex flex-col items-start justify-end pb-1">
              {/* legend row placed below the grid */}
              <div className="flex items-center gap-2 text-[12px] text-slate-400 font-medium whitespace-nowrap">
                <span className="hidden sm:inline">Less</span>
                <div className="flex items-center gap-1">
                  {colors.map((c, i) => (
                    <div key={i} className={`${c} rounded-[2px] w-3 h-3`} />
                  ))}
                </div>
                <span className="hidden sm:inline">More</span>
              </div>

              {/* small mobile legend */}
              <div className="sm:hidden mt-1 flex items-center gap-1">
                {colors.map((c, i) => (
                  <div key={i} className={`${c} rounded-[2px] w-2 h-2`} />
                ))}
              </div>
            </div>
          </div>
          {/* -------------------------------------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default GithubContributions;