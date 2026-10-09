import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { legal, site } from "@/data/site";
import { primaryAddress } from "@/data/salons";
import { formatDatePl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Polityka prywatności | BYKUCUTZZ Barbershop Łódź",
  description: "Jak strona BYKUCUTZZ Barbershop przetwarza dane osobowe.",
  robots: { index: true, follow: true },
};

/** Visible marker for facts the business has not provided yet (never guessed). */
function Fill({ value, label }: { value: string | null; label: string }) {
  if (value) return <>{value}</>;
  return <span className="border border-cyan/50 px-1.5 py-0.5 text-cyan">[do uzupełnienia: {label}]</span>;
}

export default function PrivacyPolicy() {
  return (
    <>
      <Header variant="page" address={primaryAddress()} />
      <main id="main" className="bg-ink pb-24 pt-[calc(var(--nav-h)+clamp(3rem,8vw,6rem))]">
        <article className="container-x">
          <header className="max-w-[46rem]">
            <h1 className="t-display">Polityka prywatności</h1>
            <p className="t-meta mt-5 text-steel">Ostatnia aktualizacja: {formatDatePl(legal.policyUpdated)}</p>
          </header>

          <div className="legal mt-12 max-w-[46rem] md:mt-16">
            <section>
              <h2>1. Administrator danych</h2>
              <p>
                Administratorem danych osobowych przetwarzanych w związku z korzystaniem ze strony jest{" "}
                <Fill value={legal.administrator} label="pełna nazwa firmy" />, z siedzibą:{" "}
                <Fill value={legal.address} label="adres siedziby" />, NIP: <Fill value={legal.nip} label="NIP" />.
              </p>
              <p>
                Salon: {site.name}, {primaryAddress()}.
              </p>
            </section>

            <section>
              <h2>2. Kontakt w sprawie danych</h2>
              <p>
                W sprawach dotyczących danych osobowych możesz napisać na adres: <Fill value={legal.email} label="adres e-mail" />.
                {site.phone && <> Możesz też zadzwonić: {site.phone.display}.</>}
              </p>
            </section>

            <section>
              <h2>3. Jakie dane przetwarzamy na tej stronie</h2>
              <p>
                Strona ma charakter informacyjny. Nie zawiera formularzy, nie zakładasz na niej konta i nie podajesz nam na niej
                swoich danych.
              </p>
              <p>
                Podczas wyświetlania strony serwer automatycznie zapisuje podstawowe dane techniczne (logi serwera): adres IP,
                datę i godzinę żądania, adres otwieranej podstrony, typ przeglądarki i systemu operacyjnego. Dane te służą
                wyłącznie do zapewnienia działania i bezpieczeństwa strony.
              </p>
              <p>
                Podstawa prawna: prawnie uzasadniony interes administratora, czyli zapewnienie działania i bezpieczeństwa
                strony (art. 6 ust. 1 lit. f RODO).
              </p>
            </section>

            <section>
              <h2>4. Hosting i logi serwera</h2>
              <p>
                Strona jest utrzymywana przez: <Fill value={legal.hostingProvider} label="dostawca hostingu" />. Logi serwera
                są przechowywane przez okres: <Fill value={legal.serverLogRetention} label="okres przechowywania logów" />, a
                następnie usuwane.
              </p>
            </section>

            <section>
              <h2>5. Rezerwacje przez Booksy</h2>
              <p>
                Wizyty umawiasz w serwisie Booksy. Przyciski „Umów wizytę” przenoszą Cię na nasz profil w Booksy. Dane
                podawane przy rezerwacji (np. imię, numer telefonu, wybrana usługa i termin) są przetwarzane w serwisie Booksy,
                zgodnie z zasadami prywatności Booksy dostępnymi w tym serwisie.
              </p>
            </section>

            <section>
              <h2>6. Instagram, Facebook i Mapy Google</h2>
              <p>
                Strona zawiera zwykłe linki do naszego profilu na Instagramie ({site.socials.instagram.handle})
                {site.socials.facebook && " i na Facebooku"} oraz do Map Google (przycisk „Prowadź”). Nie osadzamy na stronie treści z tych serwisów. Dopiero po kliknięciu linku
                przechodzisz do zewnętrznego serwisu, który przetwarza dane według własnych zasad.
              </p>
            </section>

            <section>
              <h2>7. Pliki cookies, analityka i pamięć przeglądarki</h2>
              <p>
                Strona nie używa plików cookies ani narzędzi analitycznych, reklamowych czy śledzących. Czcionki i zdjęcia są
                serwowane z naszego serwera, bez łączenia z zewnętrznymi dostawcami.
              </p>
              <p>Strona zapisuje w pamięci Twojej przeglądarki (localStorage i sessionStorage) dwie informacje techniczne:</p>
              <ul>
                <li>czy animacja wejścia była już wyświetlona, aby nie pokazywać jej ponownie,</li>
                <li>który salon był ostatnio wybrany w przycisku rezerwacji na telefonie (gdy dostępny jest więcej niż jeden).</li>
              </ul>
              <p>
                Te informacje nie są wysyłane do nas ani nikomu innemu. Możesz je usunąć w ustawieniach przeglądarki.
              </p>
            </section>

            <section>
              <h2>8. Twoje prawa</h2>
              <p>W zakresie przewidzianym przez RODO masz prawo do:</p>
              <ul>
                <li>dostępu do swoich danych i otrzymania ich kopii,</li>
                <li>sprostowania danych,</li>
                <li>usunięcia danych,</li>
                <li>ograniczenia przetwarzania,</li>
                <li>wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie,</li>
                <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</li>
              </ul>
            </section>

            <section>
              <h2>9. Zmiany polityki</h2>
              <p>
                Jeśli zmieni się sposób działania strony (np. dodamy nowe narzędzia), zaktualizujemy tę politykę. Data ostatniej
                aktualizacji znajduje się na górze strony.
              </p>
            </section>

            <p className="mt-12">
              <a href="/" className="link-line">
                Wróć na stronę główną
              </a>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
