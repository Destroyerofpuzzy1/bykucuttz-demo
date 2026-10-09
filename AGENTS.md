# Zasady pracy nad BYKUCUTZZ

## Obowiązkowy odczyt kontekstu przy każdym zadaniu

Przed zmianami sprawdź strukturę dokumentacji i przeczytaj `PROJECT_CONTEXT.md`,
`TASKS.md`, `CHANGELOG_AI.md`, `README.md` oraz istotne fragmenty
`docs/PHASE-1-BLUEPRINT.md`. Dla Academy przeczytaj również `docs/CUTZ-ACADEMY.md`.
Czytaj tylko pliki potrzebne do zadania; nie skanuj `node_modules`, `.next` ani
wygenerowanych plików. Dokumentacja i aktualny kod są podstawą kontekstu.
Rozbieżności zgłoś przed implementacją. Blueprint zawiera historyczny projekt;
aktualny stan opisuje `PROJECT_CONTEXT.md`.

## Git i zakres

Na początku wykonaj `git fetch origin`, `git branch --show-current`, `git status`.
Nie resetuj, nie stashuj ani nie nadpisuj cudzych zmian. Gdy nowa funkcjonalność
wymaga wydzielenia niezacommitowanych wcześniejszych prac na innym feature branchu,
przedstaw bezpieczny sposób izolacji i poczekaj na zgodę. Nie commituj, nie pushuj,
nie merguj, nie deployuj i nie zmieniaj DNS/ENV bez wyraźnego zlecenia użytkownika.

## Lokalny podgląd i praca wielu agentów

- Główny podgląd projektu działa w katalogu `C:\Users\lukas\Documents\bykucuttz-demo`
  (`npm run dev`). `http://localhost:3000` jest głównym adresem testowym strony
  głównej i `/cutz-academy`; zmiany zapisane w tym katalogu odświeża Next.js Fast
  Refresh. Aktualny branch podglądu i stan integracji opisuje `TASKS.md`. Nie
  uruchamiaj drugiego serwera na porcie 3000 i nie zatrzymuj cudzych serwerów bez zgody.
- Ten sam katalog edytuje tylko jeden agent (Claude albo Codex) naraz. Przed edycją
  sprawdź `git status` i świeżo zmienione pliki; jeśli pracuje inny agent, zatrzymaj
  się i zgłoś to użytkownikowi.
- Osobny worktree to świadomy wyjątek: własny branch i własny port (np. 3002). Jego
  zmiany nie pojawiają się w podglądzie same: trzeba je zacommitować na jego branchu
  i po zgodzie użytkownika zmergować do brancha aktywnego w głównym katalogu. Nie
  kopiuj plików między katalogami.
- Każda istotna zmiana wymaga aktualizacji właściwych plików `.md` (patrz niżej) w
  tym samym katalogu i branchu co kod.

## Implementacja i zakończenie

Zachowaj Next.js App Router, istniejące komponenty, tokeny i GSAP. Nie zmieniaj
niepowiązanych sekcji. Używaj autentycznych materiałów Academy; nie wymyślaj cen,
terminów, instruktorów, certyfikatów ani innych danych biznesowych. Braki oznaczaj
jako wymagające potwierdzenia. Szanuj `prefers-reduced-motion` i semantykę HTML.

Uruchom `npm run lint` i `npm run build`, wykonaj adekwatną kontrolę w przeglądarce.
Po implementacji obowiązkowo zaktualizuj `CHANGELOG_AI.md`, `TASKS.md`,
`PROJECT_CONTEXT.md` i inne zmienione opisy architektury. Dokumentacja musi
odzwierciedlać kod. Raportuj zmiany, assety, wyniki testów, status Gita i brakujące
dane, a następnie zakończ pracę zgodnie ze zleceniem użytkownika.
