# Mój sklep

Przykładowa aplikacja prezentująca architekturę heksagonalną

Mamy sklep / hurtownię o nazwie "Moje ciuszki"
Sklep prowadzi sprzedaż detaliczną i hurtową artykułów odzieżowych
Do dokonania zakupu wymagane jest konto użytkownika,
do przeglądania produktów logowanie nie jest wymagane
Sklep zamawia pewną ilość produktów na swój magazyn głównie na potrzeby klientów detalicznych,
te produkty mają z góry znaną cenę i są realizowane jak szybko to możliwe
Jeżeli ktoś zamawia większe ilości produktów (zmówienie hurtowe) 
lub skończyły się zapasy sklepowe sklep dokonuje zamówienia u producenta,
cena wtedy weryfikowana jest z aktualną ceną producenta i trendami na rynku za ustaleniem których odpowiedzialny jest moduł AI,
Jeżeli cena po weryfikacji mieści się w akceptowalnym zakresie uznajemy cenę poprzednią czyli tą podaną na stronie
W przeciwnym przypadku klient jest informowany o zmianie ceny i musi się zgodzić na nową propozycję transakcji
System szacuje prawdopodobny czas dostawy
Sytem udziela rabatów wg ustalonych zasad, np powyżej 100 sztuk -5%, powyżej 1000 -10% itd tabele te tworzy kierownik w excelu i tego nie zmieni bo to najlepszy program jaki kiedykolwiek powstał
Klienci hurtowi terminowo rozliczający się ze sklepem mogą liczyć na dodatkowe zniżki tu dodatkowe -5% tu równierz excel
Niektórzy klienci hurtowi (Szalikpol, świat czapek, spodniex) dostają zniżki ale obniżone o 50% gdyż podpadli szefowi
Zamówienia o wartości powyżej 50 000 zł muszą być zakceptowane przez kierownika
System zapewnia pełny przegląd danych historycznych
zamówienia nie są usuwane czy modyfikowane tworzymy nowe a dane historyczne służą do analiz AI

