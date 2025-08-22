import React, { useMemo, useRef, useState } from "react";
export default function NetflixGPTMovies({
  title = "Trending Now",
  movies: moviesProp,
  showSearch = true,
  showGenres = true,
  maxRows = 1,
}) {
  const defaultMovies = useMemo(
    () => [
      {
        id: 1,
        title: "Dune: Part Two",
        poster:
          "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        year: 2024,
        rating: 8.6,
        genres: ["Sci‑Fi", "Adventure"],
        overview:
          "Paul Atreides unites with the Fremen to seek revenge against the conspirators who destroyed his family.",
      },
      {
        id: 2,
        title: "Oppenheimer",
        poster:
          "https://image.tmdb.org/t/p/w500/8GxT3JXKKP67T5X7Q7v3hy3se6Z.jpg",
        year: 2023,
        rating: 8.4,
        genres: ["Drama", "History"],
        overview:
          "The story of J. Robert Oppenheimer, father of the atomic bomb.",
      },
      {
        id: 3,
        title: "Spider‑Man: Across the Spider‑Verse",
        poster:
          "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        year: 2023,
        rating: 8.7,
        genres: ["Animation", "Action"],
        overview:
          "Miles Morales catapults across the Multiverse to team up with Gwen Stacy.",
      },
      {
        id: 4,
        title: "Top Gun: Maverick",
        poster:
          "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
        year: 2022,
        rating: 8.3,
        genres: ["Action", "Drama"],
        overview:
          "Maverick confronts ghosts of his past while training elite graduates for a dangerous mission.",
      },
      {
        id: 5,
        title: "The Batman",
        poster:
          "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        year: 2022,
        rating: 7.9,
        genres: ["Crime", "Mystery"],
        overview:
          "Batman uncovers corruption in Gotham while pursuing the Riddler.",
      },
      {
        id: 6,
        title: "Barbie",
        poster:
          "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        year: 2023,
        rating: 7.0,
        genres: ["Comedy", "Fantasy"],
        overview:
          "Barbie suffers a crisis that leads her to question her world and her existence.",
      },
      {
        id: 7,
        title: "John Wick: Chapter 4",
        poster:
          "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        year: 2023,
        rating: 7.8,
        genres: ["Action", "Thriller"],
        overview:
          "John Wick discovers a path to defeating the High Table.",
      },
      {
        id: 8,
        title: "Inside Out 2",
        poster:
          "https://image.tmdb.org/t/p/w500/2PZbD3H4CE3s8G1aQGDr3U8nS1G.jpg",
        year: 2024,
        rating: 7.8,
        genres: ["Animation", "Family"],
        overview:
          "Riley enters high school with brand‑new emotions moving in.",
      },
      {
        id: 9,
        title: "The Dark Knight",
        poster:
          "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        year: 2008,
        rating: 9.0,
        genres: ["Action", "Crime"],
        overview:
          "Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.",
      },
      {
        id: 10,
        title: "Interstellar",
        poster:
          "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        year: 2014,
        rating: 8.6,
        genres: ["Sci‑Fi", "Drama"],
        overview:
          "Explorers travel through a wormhole in space to ensure humanity's survival.",
      },
    ],
    []
  );

  const allMovies = moviesProp?.length ? moviesProp : defaultMovies;
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  const genres = useMemo(() => {
    const set = new Set(["All"]);
    allMovies.forEach((m) => m.genres?.forEach((g) => set.add(g)));
    return Array.from(set);
  }, [allMovies]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allMovies.filter((m) => {
      const matchesQ = q
        ? `${m.title} ${m.year} ${m.overview}`.toLowerCase().includes(q)
        : true;
      const matchesG = activeGenre === "All" ? true : m.genres?.includes(activeGenre);
      return matchesQ && matchesG;
    });
  }, [allMovies, query, activeGenre]);

  // Bucket by genre if maxRows > 1
  const byGenre = useMemo(() => {
    if (maxRows <= 1) return { [title]: filtered };
    const buckets = {};
    filtered.forEach((m) => {
      (m.genres || ["Other"]).forEach((g) => {
        if (!buckets[g]) buckets[g] = [];
        buckets[g].push(m);
      });
    });
    return buckets;
  }, [filtered, maxRows, title]);

  return (
    <section className="w-full text-white">
      <Header
        title={title}
        showSearch={showSearch}
        query={query}
        onQuery={setQuery}
        showGenres={showGenres}
        genres={genres}
        activeGenre={activeGenre}
        onGenre={setActiveGenre}
      />

      <div className="space-y-8">
        {Object.entries(byGenre)
          .slice(0, maxRows > 1 ? maxRows : 1)
          .map(([bucketTitle, items]) => (
            <Rail key={bucketTitle} title={maxRows > 1 ? bucketTitle : title} items={items} />
          ))}
      </div>
    </section>
  );
}

function Header({
  title,
  showSearch,
  query,
  onQuery,
  showGenres,
  genres,
  activeGenre,
  onGenre,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-4">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-white/60">Netflix‑style carousel with search & filters</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {showGenres && (
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => onGenre(g)}
                className={
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition " +
                  (activeGenre === g
                    ? "bg-white text-black border-white"
                    : "bg-black/40 border-white/20 hover:bg-white/10")
                }
              >
                {g}
              </button>
            ))}
          </div>
        )}

        {showSearch && (
          <div className="relative">
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-72 max-w-full bg-white/10 focus:bg-white/15 placeholder-white/60 text-white rounded-xl px-4 py-2.5 outline-none border border-white/20 focus:border-white/40 transition"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60 text-sm">⌘K</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Rail({ title, items = [] }) {
  const scrollerRef = useRef(null);

  const scrollBy = (delta) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="group/rail">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-white/90">{title}</h3>
        <div className="hidden sm:flex gap-2">
          <Arrow onClick={() => scrollBy(-600)} direction="left" />
          <Arrow onClick={() => scrollBy(600)} direction="right" />
        </div>
      </div>

      <div className="relative">
        {/* Arrows floating on edges for mobile/hover */}
        <ArrowFloating onClick={() => scrollBy(-600)} side="left" />
        <ArrowFloating onClick={() => scrollBy(600)} side="right" />

        <ul
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pr-2 pl-2 -mx-2 hide-scrollbar"
        >
          {items.map((m) => (
            <li key={m.id} className="snap-start shrink-0 w-40 sm:w-48">
              <Card movie={m} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Arrow({ onClick, direction }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-white/20 px-3 py-1.5 text-sm hover:bg-white hover:text-black transition"
      aria-label={`Scroll ${direction}`}
    >
      {direction === "left" ? "←" : "→"}
    </button>
  );
}

function ArrowFloating({ onClick, side }) {
  return (
    <button
      onClick={onClick}
      className={
        "absolute top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 transition opacity-0 group-hover/rail:opacity-100 " +
        (side === "left" ? "left-2" : "right-2")
      }
      aria-label={`Scroll ${side}`}
    >
      {side === "left" ? "←" : "→"}
    </button>
  );
}

function Card({ movie }) {
  return (
    <div className="relative group/card">
      <div className="aspect-[2/3] w-full overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover transition duration-300 group-hover/card:scale-105"
          loading="lazy"
        />
      </div>

      {/* Overlay on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover/card:opacity-100 transition" />

      <div className="absolute inset-x-2 bottom-2 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded bg-white text-black font-semibold">{movie.rating?.toFixed?.(1) ?? movie.rating}</span>
          <span className="text-xs text-white/80">{movie.year}</span>
        </div>
        <h4 className="text-sm font-semibold leading-tight line-clamp-2">{movie.title}</h4>
        <p className="text-[11px] text-white/70 line-clamp-2">{movie.overview}</p>
        <div className="flex flex-wrap gap-1 pt-1">
          {movie.genres?.slice(0, 3).map((g) => (
            <span key={g} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 ring-1 ring-white/15">
              {g}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex gap-2 pt-2">
          <button className="pointer-events-auto flex-1 rounded-xl bg-white text-black text-xs font-semibold px-3 py-2 hover:opacity-90 transition">
            ▶ Play
          </button>
          <button className="pointer-events-auto rounded-xl bg-white/10 ring-1 ring-white/20 text-xs px-3 py-2 hover:bg-white/15">
            ⊕ My List
          </button>
        </div>
      </div>
    </div>
  );
}
