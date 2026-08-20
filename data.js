(function () {
  "use strict";

  const drive = {
    unit12: "https://drive.google.com/file/d/1qcUkWn5l1zttjaNHbPQ4JIzDRqpDHIph/view?usp=drivesdk",
    unit34: "https://drive.google.com/file/d/1JQ0LmqxezzgtGViOVmuTrViALB3b1bQl/view?usp=drivesdk",
    unit45: "https://drive.google.com/file/d/17D9_7H8i0inQt0sonXO4x1zXxCUiP80_/view?usp=drivesdk",
    unit56: "https://drive.google.com/file/d/18AwtornHSsb8tL7fFC5wxelXcjN8Ber2/view?usp=drivesdk",
    unit7: "https://drive.google.com/file/d/1agpP79BKczDvYKoxzDjEyp8CeuQWcciO/view?usp=drivesdk",
    unit8: "https://drive.google.com/file/d/16hm3Eu9Cmaf6VjrU3oOiuy7oNWDGcsOr/view?usp=drivesdk",
    unit9: "https://drive.google.com/file/d/17I7fqrcjl4joBnZQ4H6bMwmlSJcWE0-h/view?usp=drivesdk",
    unit1011: "https://drive.google.com/file/d/1sxsuCPwHnyYJSeAgTGBbO8tFcuzlnQIh/view?usp=drivesdk",
    unit12only: "https://drive.google.com/file/d/1NtEygmHQIFWQjO25woZATXAFLb20gPb0/view?usp=drivesdk",
    unit1314: "https://drive.google.com/file/d/1wwOxvj-J_sLGlY2VuL4YSxWZx1MSycRo/view?usp=drivesdk",
    unit1516: "https://drive.google.com/file/d/1egW8Yx2nBIBTQhSUl8MSNRaSJ6H0_TSI/view?usp=drivesdk",
    unit1718: "https://drive.google.com/file/d/1IP_kliR82YHYOkWTAgeeBpU8NUBuLVBG/view?usp=drivesdk",
    unit2122: "https://drive.google.com/file/d/19T4R9xNN2V9lSbtAgdHZdoazrJqL4Xgj/view?usp=drivesdk",
    unit2324: "https://drive.google.com/file/d/1G3DDLr2CdK37AuQ8dabsDnoFEYHuz9XA/view?usp=drivesdk",
    general: "https://drive.google.com/file/d/1MDcdeUZvgz6Olx7lckPEjyYaER_6CcCm/view?usp=drivesdk",

    praeteritum: "https://drive.google.com/file/d/1Qof2D3pGnR0Bw95dx6_8gf79NsxRLLDz/view?usp=drivesdk",
    wechsel: "https://drive.google.com/file/d/1WT_1K-8qChJmT2JjM8JmGpXuaHaxGM2x/view?usp=drivesdk",
    adjective: "https://drive.google.com/file/d/1OvEcaL3P8ym0ysCC8ROMOO5ja25kUkAn/view?usp=drivesdk",
    adjectiveN: "https://drive.google.com/file/d/15Q46YTDdoKpQptdfFzzzHqxlBufKRM05/view?usp=drivesdk",
    temporal: "https://drive.google.com/file/d/1f03wRpCzJAbfMnnTjbG7TMF4jiJecAmN/view?usp=drivesdk",
    connectors: "https://drive.google.com/file/d/1P8DGTq1jX3_Ajh7Q0zHUwFHSa8MJM5HZ/view?usp=drivesdk",
    dassWeil: "https://drive.google.com/file/d/17hzsX-ipTputSMWYyXoqvYXzBxedD9mG/view?usp=drivesdk",
    reflexive: "https://drive.google.com/file/d/10REiLgCzm9jTcivNIf0kHC3x4Ej-aE98/view?usp=drivesdk",
    wenn: "https://drive.google.com/file/d/14JJ1EcuPeeP3rpO5xoVLb6FUK5jT_u9C/view?usp=drivesdk",
    passive: "https://drive.google.com/file/d/1uSLzj8LcEAw5_Q6Ayv_5l6sKSt2QW7rV/view?usp=drivesdk",
    dativ: "https://drive.google.com/file/d/1OlJ_6c16TWdtYQubnwvVShfmZv7pIF3l/view?usp=drivesdk",
    indirect: "https://drive.google.com/file/d/1gaWcG2M1FBzhUu4lwjUeFZcgapN3tphg/view?usp=drivesdk",
    local: "https://drive.google.com/file/d/1VDxaX9QUIBLbe04gU4KmITYNiMT72m_9/view?usp=drivesdk",
    lassen: "https://drive.google.com/file/d/1V7nBSNba96q4MfYoQb1UVdUx4NqMa5iI/view?usp=drivesdk",
    welch: "https://drive.google.com/file/d/1H5VC0RaspO8Z7yD0gfsRjkDDvko_lLiG/view?usp=drivesdk",

    biography: "https://drive.google.com/file/d/1bA-1NKTYZvraqBZWBHmPpCtxC-uEEFzi/view?usp=drivesdk",
    moving: "https://drive.google.com/file/d/1nBrynhPPd5b3H9AWyTL5_phjAtzYZ8yN/view?usp=drivesdk",
    home: "https://drive.google.com/file/d/1fJ2r3Nz1-8QDFp1P_xQZOE_1FyrayZlD/view?usp=drivesdk",
    travel: "https://drive.google.com/file/d/1I2oi89z8k_3VoM3xaKtz0JZrL1Jnl4O6/view?usp=drivesdk",
    food: "https://drive.google.com/file/d/1dSquNQTHdYvlJsIGC48z9vBCQJhXnuzK/view?usp=drivesdk",
    deli: "https://drive.google.com/file/d/1D1zPHeHX3ob0oq0usVLv11vFJmtqSxs-/view?usp=drivesdk",
    culture: "https://drive.google.com/file/d/1Hep9N-f9agLai0GbH8gbueCG3JwN7Hnd/view?usp=drivesdk",
    sport: "https://drive.google.com/file/d/1ewXkQ21jd8BVPbK7C07a-Hdav2TvOyov/view?usp=drivesdk",
    feelings: "https://drive.google.com/file/d/11rae7GlifeFNraMyIqYlMKYBDp9zgfto/view?usp=drivesdk",
    business: "https://drive.google.com/file/d/1xKUxy2mJ7tHbnnbGQA3f0rhIQHHXcFFp/view?usp=drivesdk",
    polite: "https://drive.google.com/file/d/1YPJcNQ5EurzaMMN7kCXofy3MBfwPm6_K/view?usp=drivesdk",
    firm: "https://drive.google.com/file/d/16EgHRmKyuDUJae5wscTr7X_Sl5cJpERm/view?usp=drivesdk",
    communication: "https://drive.google.com/file/d/1iFyrqeFYGQi4LUjXaX5CI9sUuvHnEtip/view?usp=drivesdk",
    phone: "https://drive.google.com/file/d/1UZIbdXzZn0NLibtJOtzbzqGxBChtqw6Y/view?usp=drivesdk",
    opinion: "https://drive.google.com/file/d/1j0fBOixbw2sf5U2Qi0bbJu-1VZeifK8X/view?usp=drivesdk",
    life: "https://drive.google.com/file/d/1NXWRmiBpW8oCfVSAAWDQh7_GuaETNw9r/view?usp=drivesdk",
    cv: "https://drive.google.com/file/d/1A9suuHO657hT_CLMUAFJ_Qg6GCUXdJ7J/view?usp=drivesdk"
  };

  const choice = (q, options, answer, explain) => ({ q, options, answer, explain });
  const fill = (before, after, answers, hint) => ({ before, after, answers, hint });
  const order = (tokens, answer, hint) => ({ tokens, answer, hint });
  const video = (label, url, kind) => ({ label, url, kind });

  const units = [
    {
      id: 1,
      title: "Mein Opa war auch schon Bäcker.",
      topic: "Berufe und Familie",
      grammar: "Possessivartikel unser/euer; Perfekt tekrarı; Präteritum war/hatte",
      summary: "Aile hikâyesi anlatırken kişileri ve geçmişteki durumları birbirine bağlarız. unser/euer isimden önce artikel gibi çekilir. war ve hatte ise geçmişteki durum ve sahipliği kısa biçimde anlatır.",
      logic: "Türkçe mantık: 'bizim/sizin' kelimesi ismin cinsine ve hâline göre son ek alır: unser Onkel, unsere Tante, unseren Opa.",
      examples: ["Das ist unser Onkel.", "Früher hatte meine Oma ein Café.", "Wir haben gestern lange telefoniert."],
      choices: [
        choice("Das ist ___ Familienfoto.", ["unser", "unsere", "unseren"], 0, "Familienfoto nötr ve Nominativ: unser."),
        choice("Meine Großeltern ___ früher eine Bäckerei.", ["hatten", "waren", "haben"], 0, "Sahiplik geçmişte hatte/hatten ile anlatılır."),
        choice("Wir haben uns gestern lange ___.", ["unterhalten", "unterhaltet", "unterhaltene"], 0, "Perfekt: haben + Partizip II.")
      ],
      fills: [
        fill("Das ist", "Onkel. (bizim)", ["unser"], "Onkel: der, Nominativ"),
        fill("Früher", "mein Opa Bäcker.", ["war"], "sein fiilinin Präteritum biçimi")
      ],
      order: order(["in", "Meine", "studiert.", "hat", "Schwester", "Berlin"], "Meine Schwester hat in Berlin studiert.", "Perfektte yardımcı fiil 2. yerde, Partizip sonda."),
      speaking: ["Was waren Ihre Großeltern von Beruf? Erzählen Sie in drei Sätzen.", "Stellen Sie zwei Personen aus Ihrer Familie vor."],
      videos: [video("Ünite 1-2 ders videosu", drive.unit12, "Ünite dersi"), video("Präteritum kısa anlatım", drive.praeteritum, "Kısa gramer"), video("Biyografi konuşma kalıpları", drive.biography, "Konuşma")]
    },
    {
      id: 2,
      title: "Wohin mit der Kommode?",
      topic: "Wohnen und Umzug",
      grammar: "Wechselpräpositionen: Wo? + Dativ / Wohin? + Akkusativ; stehen/stellen",
      summary: "Konum sabitse Wo? sorusuna Dativ, bir yere doğru hareket varsa Wohin? sorusuna Akkusativ gelir. stehen/liegen/hängen konumu; stellen/legen/hängen ise yerleştirme hareketini anlatır.",
      logic: "Wo? = nerede, sonuç sabit: auf dem Tisch. Wohin? = nereye, yön var: auf den Tisch.",
      examples: ["Die Lampe steht neben dem Sofa.", "Stell die Lampe neben das Sofa.", "Das Bild hängt an der Wand."],
      choices: [
        choice("Der Teppich liegt ___ Sofa.", ["vor dem", "vor das", "vor den"], 0, "Wo? sorusu Dativ ister."),
        choice("Stell die Lampe ___ Schreibtisch.", ["auf den", "auf dem", "an der"], 0, "Wohin? + Akkusativ: auf den Schreibtisch."),
        choice("Das Bild hängt ___ Wand.", ["an der", "an die", "auf den"], 0, "Sabit konum: an + Dativ.")
      ],
      fills: [
        fill("Die Schlüssel liegen in", "Schublade.", ["der"], "Wo? Dativ, die Schublade → der Schublade"),
        fill("Ich stelle den Sessel vor", "Fenster.", ["das"], "Wohin? Akkusativ, das Fenster değişmez")
      ],
      order: order(["neben", "Die", "steht", "Tür.", "Kommode", "der"], "Die Kommode steht neben der Tür.", "stehen sabit konumu gösterir."),
      speaking: ["Wo stehen die Möbel in Ihrem Wohnzimmer?", "Sie ziehen um. Geben Sie drei Einrichtungstipps."],
      videos: [video("Ünite 1-2 ders videosu", drive.unit12, "Ünite dersi"), video("Wo/Wohin kısa gramer", drive.wechsel, "Kısa gramer"), video("Taşınma konuşma kalıpları", drive.moving, "Konuşma")]
    },
    {
      id: 3,
      title: "Hier finden Sie Ruhe und Erholung.",
      topic: "Tourismus und Natur",
      grammar: "Wortbildung: Verb + -er / Verb + -ung",
      summary: "Almancada fiilden kişi veya iş adı üretmek için sıkça -er, süreç ya da sonuç adı üretmek için -ung kullanılır. İsimler her zaman büyük harfle başlar.",
      logic: "machen → der Macher; ordnen → die Ordnung. -ung ile oluşan isimler daima dişildir.",
      examples: ["vermieten → der Vermieter", "wandern → der Wanderer", "sich erholen → die Erholung"],
      choices: [
        choice("Jemand, der Wohnungen vermietet, ist ein ___.", ["Vermieter", "Vermietung", "vermieten"], 0, "Kişi adı -er ile kurulur."),
        choice("ordnen → die ___", ["Ordnung", "Ordner", "ordnet"], 0, "Sonuç adı: die Ordnung."),
        choice("Wir suchen Ruhe und ___.", ["Erholung", "Erholer", "erholen"], 0, "Fiilden isim: die Erholung.")
      ],
      fills: [
        fill("arbeiten → der", "", ["Arbeiter"], "Kişi adı için -er"),
        fill("sich anmelden → die", "", ["Anmeldung"], "-ung isimleri die artikelini alır")
      ],
      order: order(["am", "Ich", "fahren.", "würde", "Meer", "liebsten", "ans"], "Ich würde am liebsten ans Meer fahren.", "würde 2. yerde, ana fiil sonda."),
      speaking: ["Wo erholen Sie sich am besten? Begründen Sie.", "Empfehlen Sie einen ruhigen Urlaubsort."],
      videos: [video("Ünite 3-4 ders videosu", drive.unit34, "Ünite dersi"), video("A2 gramer alıştırmaları", drive.general, "Alıştırma"), video("Seyahat konuşma kalıpları", drive.travel, "Konuşma")]
    },
    {
      id: 4,
      title: "Was darf es sein?",
      topic: "Einkaufen und Lebensmittel",
      grammar: "Adjektivdeklination nach indefinitem Artikel",
      summary: "ein/eine/kein veya iyelik artikelinden sonra sıfat, artikelin göstermediği cins ve hâl bilgisini tamamlar. Akkusativ eril yapıda sıfat genellikle -en alır.",
      logic: "ein kalın harfi göstermiyorsa sıfat gösterir: ein frisch-es Brot. einen zaten -en gösterdiği için sıfat da -en olur.",
      examples: ["ein frisches Brot", "eine reife Banane", "einen milden Käse"],
      choices: [
        choice("Ich hätte gern einen ___ Käse.", ["milden", "milder", "mildes"], 0, "Akkusativ maskulin: einen milden."),
        choice("Wir brauchen ein ___ Brot.", ["frisches", "frische", "frischen"], 0, "Nötr Akkusativ: ein frisches Brot."),
        choice("Sie kauft keine ___ Tomaten.", ["reifen", "reife", "reifes"], 0, "Çoğul keine sonrası -en.")
      ],
      fills: [
        fill("Ich nehme eine", "Birne.", ["reife"], "die Birne, Akkusativ"),
        fill("Haben Sie einen", "Schinken?", ["mageren"], "einen sonrası sıfat -en")
      ],
      order: order(["gern", "Ich", "Käse.", "hätte", "milden", "einen"], "Ich hätte gern einen milden Käse.", "Nazik istek: Ich hätte gern ..."),
      speaking: ["Bestellen Sie drei Produkte an der Käsetheke.", "Was kaufen Sie jede Woche? Nennen Sie Mengen und Verpackungen."],
      videos: [video("Ünite 3-4 ders videosu", drive.unit34, "Ünite dersi"), video("Sıfat sonları kısa gramer", drive.adjective, "Kısa gramer"), video("Şarküteri konuşma kalıpları", drive.deli, "Konuşma")]
    },
    {
      id: 5,
      title: "Schaut mal, der schöne Dom!",
      topic: "Stadtbesichtigung",
      grammar: "Adjektivdeklination nach definitem Artikel",
      summary: "der/die/das gibi belirli artikelden sonra sıfat çoğunlukla -e veya -en alır. Nominativ tekilde genellikle -e; diğer birçok durumda -en kullanılır.",
      logic: "Artikel bilgiyi açıkça taşıdığı için sıfatın işi kolaydır: der schön-e Dom, den schön-en Dom.",
      examples: ["der berühmte Dom", "die neue Ausstellung", "Wir besuchen den alten Markt."],
      choices: [
        choice("Das ist der ___ Dom.", ["berühmte", "berühmten", "berühmter"], 0, "Nominativ maskulin belirli artikel: -e."),
        choice("Wir besichtigen die ___ Kirche.", ["alte", "alten", "altes"], 0, "Akkusativ feminin: die alte Kirche."),
        choice("Kennst du den ___ Platz?", ["großen", "große", "großes"], 0, "Akkusativ maskulin: den großen Platz.")
      ],
      fills: [
        fill("Wir besuchen das", "Rathaus.", ["alte"], "das + sıfat -e"),
        fill("Neben dem", "Museum ist ein Café.", ["neuen"], "Dativte sıfat -en")
      ],
      order: order(["interessante", "die", "Wir", "Ausstellung.", "besuchen"], "Wir besuchen die interessante Ausstellung.", "Fiil 2. yerde; nesne Akkusativ."),
      speaking: ["Planen Sie eine kurze Stadtbesichtigung.", "Beschreiben Sie eine Sehenswürdigkeit in Ihrer Stadt."],
      videos: [video("Ünite 5-6 ders videosu", drive.unit56, "Ünite dersi"), video("Sıfat sonları kısa gramer", drive.adjective, "Kısa gramer"), video("Seyahat konuşma kalıpları", drive.travel, "Konuşma")]
    },
    {
      id: 6,
      title: "Meine Lieblingsveranstaltung",
      topic: "Kultur und Veranstaltungen",
      grammar: "Temporale Präpositionen: seit, vor, über, von ... an",
      summary: "Zaman edatları bir olayın başlangıcını, süresini veya geçmişteki uzaklığını gösterir. seit hâlâ devam eden durumu; vor geçmişteki zamanı; über süreyi anlatır.",
      logic: "seit + başlangıç ve hâlâ sürüyor; vor + '... önce'; über + '... boyunca / ...den fazla'.",
      examples: ["Seit einem Jahr tanze ich Salsa.", "Vor zwei Wochen war das Festival.", "Von morgen an üben wir täglich."],
      choices: [
        choice("___ drei Jahren spielt sie Theater.", ["Seit", "Vor", "Über"], 0, "Eylem üç yıl önce başlayıp hâlâ sürüyor."),
        choice("Das Konzert war ___ einer Woche.", ["vor", "seit", "von"], 0, "Geçmişte 'bir hafta önce': vor."),
        choice("Wir haben ___ zwei Stunden getanzt.", ["über", "seit", "an"], 0, "Süre: über zwei Stunden.")
      ],
      fills: [
        fill("Von Montag", "ist das Museum länger geöffnet.", ["an"], "von ... an = ...den itibaren"),
        fill("Ich war", "einem Monat im Theater.", ["vor"], "... önce")
      ],
      order: order(["seit", "Sie", "Chor.", "einem", "singt", "Jahr", "im"], "Sie singt seit einem Jahr im Chor.", "seit + Dativ."),
      speaking: ["Welche Veranstaltung besuchen Sie gern?", "Schlagen Sie einen Kulturabend vor und einigen Sie sich."],
      videos: [video("Ünite 5-6 ders videosu", drive.unit56, "Ünite dersi"), video("Zaman edatları kısa gramer", drive.temporal, "Kısa gramer"), video("Kültür-sanat konuşma kalıpları", drive.culture, "Konuşma")]
    },
    {
      id: 7,
      title: "Wir könnten montags joggen gehen.",
      topic: "Sport und Fitness",
      grammar: "Konjunktiv II: könnte/sollte; temporale Präposition zwischen; Adverbien montags",
      summary: "könnte yumuşak öneri, sollte tavsiye verir. Gün adının sonuna -s gelince düzenli tekrar anlatılır: montags = pazartesileri.",
      logic: "können → könnten (yapabiliriz); sollen → sollten (yapmalısın). Bu biçimler cümlede 2. yerde durur, ana fiil sonda kalır.",
      examples: ["Wir könnten zusammen trainieren.", "Du solltest mehr Wasser trinken.", "Montags gehe ich schwimmen."],
      choices: [
        choice("Du hast Rückenschmerzen. Du ___ Yoga machen.", ["solltest", "könntest du", "sollstet"], 0, "Tavsiye: Du solltest ..."),
        choice("___ wir am Samstag joggen gehen?", ["Könnten", "Sollten du", "Könnte"], 0, "wir ile könnten."),
        choice("Ich spiele ___ Volleyball.", ["freitags", "Freitag", "freitag"], 0, "Düzenli tekrar için gün + -s.")
      ],
      fills: [
        fill("Du", "öfter Pausen machen.", ["solltest"], "tavsiye"),
        fill("Wir", "morgen Rad fahren.", ["könnten"], "yumuşak öneri")
      ],
      order: order(["montags", "Wir", "gehen.", "joggen", "könnten"], "Wir könnten montags joggen gehen.", "Modal yapı: çekimli fiil 2., ana fiil sonda."),
      speaking: ["Bitten Sie um Rat: Sie möchten fitter werden.", "Machen Sie drei Vorschläge für einen gemeinsamen Sportplan."],
      videos: [video("Ünite 7 ders videosu", drive.unit7, "Ünite dersi"), video("Zaman edatları kısa gramer", drive.temporal, "Kısa gramer"), video("Spor konuşma kalıpları", drive.sport, "Konuşma")]
    },
    {
      id: 8,
      title: "Hoffentlich ist es nicht das Herz!",
      topic: "Gesundheit und Krankheit",
      grammar: "Konnektoren weil und deshalb",
      summary: "weil neden verir ve yan cümlede fiili sona yollar. deshalb sonuç bildirir ve ardından fiil hemen gelir.",
      logic: "weil = çünkü: ..., weil ich krank bin. deshalb = bu yüzden: Ich bin krank. Deshalb bleibe ich zu Hause.",
      examples: ["Ich bleibe im Bett, weil ich Fieber habe.", "Ich habe Fieber. Deshalb rufe ich den Arzt an.", "Weil es weh tut, nehme ich eine Tablette."],
      choices: [
        choice("Ich gehe zum Arzt, ___ ich starke Schmerzen habe.", ["weil", "deshalb", "denn dass"], 0, "Neden cümlesi: weil."),
        choice("Mira ist krank. ___ bleibt sie zu Hause.", ["Deshalb", "Weil", "Dass"], 0, "İkinci cümle sonuç bildiriyor."),
        choice("weil ich Kopfschmerzen ___", ["habe", "hat", "bin"], 0, "weil yan cümlesinde fiil sonda.")
      ],
      fills: [
        fill("Ich trinke Tee,", "ich erkältet bin.", ["weil"], "neden bildirir"),
        fill("Er hat Fieber.", "geht er nicht arbeiten.", ["Deshalb"], "sonuç bildirir")
      ],
      order: order(["weil", "Sie", "muss", "sie", "bleiben,", "krank", "zu Hause", "ist."], "Sie muss zu Hause bleiben, weil sie krank ist.", "weil yan cümlesinde ist sonda."),
      speaking: ["Drücken Sie Mitleid und Hoffnung aus.", "Geben Sie einer erkälteten Person drei Ratschläge."],
      videos: [video("Ünite 8 ders videosu", drive.unit8, "Ünite dersi"), video("Dass/Weil kısa gramer", drive.dassWeil, "Kısa gramer"), video("Duygular konuşma kalıpları", drive.feelings, "Konuşma")]
    },
    {
      id: 9,
      title: "Bei guten Autos sind wir ganz vorn.",
      topic: "Arbeitsleben",
      grammar: "Adjektivdeklination nach Nullartikel",
      summary: "Artikel yoksa sıfat, ismin cins ve hâl bilgisini kendi sonunda gösterir. Bu yüzden sıfat sonları belirginleşir: flexible Arbeitszeit, gutes Gehalt, mit netten Kollegen.",
      logic: "Artikel yoksa sıfat artikelin işini üstlenir: gut-es Gehalt, flexibel-e Arbeitszeit.",
      examples: ["flexible Arbeitszeit", "gutes Betriebsklima", "mit netten Kollegen"],
      choices: [
        choice("___ Arbeitszeiten sind mir wichtig.", ["Flexible", "Flexiblen", "Flexibles"], 0, "Çoğul Nominativ, artikelsiz: -e."),
        choice("Er sucht ___ Betriebsklima.", ["gutes", "gute", "guten"], 0, "Nötr Akkusativ, artikelsiz: -es."),
        choice("Sie arbeitet mit ___ Kollegen.", ["netten", "nette", "netter"], 0, "Dativ çoğul: -en.")
      ],
      fills: [
        fill("Ich brauche", "Aufgaben.", ["interessante"], "Akkusativ çoğul, artikelsiz"),
        fill("Bei", "Firmen gibt es Weiterbildung.", ["modernen"], "bei + Dativ çoğul")
      ],
      order: order(["sind", "Arbeitszeiten", "mir", "Flexible", "wichtig."], "Flexible Arbeitszeiten sind mir wichtig.", "Özne başta, fiil 2. yerde."),
      speaking: ["Was ist Ihnen bei der Arbeit wichtig?", "Beschreiben Sie Ihren idealen Arbeitsplatz."],
      videos: [video("Ünite 9 ders videosu", drive.unit9, "Ünite dersi"), video("Sıfat sonları ve N-Deklination", drive.adjectiveN, "Kısa gramer"), video("İş dünyası konuşma kalıpları", drive.business, "Konuşma")]
    },
    {
      id: 10,
      title: "Gut, dass du reserviert hast.",
      topic: "Im Restaurant",
      grammar: "Nebensatz mit dass",
      summary: "dass, bir düşünceyi veya durumu ana cümleye bağlar. dass yan cümlesinde çekimli fiil sona gider.",
      logic: "Ich finde es gut + du hast reserviert → Ich finde es gut, dass du reserviert hast.",
      examples: ["Schön, dass Sie da sind.", "Ich glaube, dass die Suppe kalt ist.", "Gut, dass wir einen Tisch haben."],
      choices: [
        choice("Ich hoffe, ___ noch ein Tisch frei ist.", ["dass", "weil", "deshalb"], 0, "Umut edilen içeriği dass bağlar."),
        choice("Schade, dass das Essen kalt ___.", ["ist", "sein", "sind"], 0, "dass yan cümlesinde fiil sonda."),
        choice("Gut, dass du die Rechnung ___ hast.", ["bezahlt", "bezahlen", "bezahlst"], 0, "Perfekt yan cümle: bezahlt hast.")
      ],
      fills: [
        fill("Ich finde es gut,", "du reserviert hast.", ["dass"], "içerik yan cümlesi"),
        fill("Sie sagt, dass die Suppe zu salzig", ".", ["ist"], "çekimli fiil sonda")
      ],
      order: order(["dass", "Ich", "der", "kalt", "glaube,", "Kaffee", "ist."], "Ich glaube, dass der Kaffee kalt ist.", "dass cümlesinde ist en sonda."),
      speaking: ["Bestellen Sie höflich ein Menü.", "Reklamieren Sie: Die Suppe ist kalt und die Rechnung ist falsch."],
      videos: [video("Ünite 10-11 ders videosu", drive.unit1011, "Ünite dersi"), video("Dass/Weil kısa gramer", drive.dassWeil, "Kısa gramer"), video("Nezaket konuşma kalıpları", drive.polite, "Konuşma")]
    },
    {
      id: 11,
      title: "Ich freue mich so.",
      topic: "Firmenporträt und Feiern",
      grammar: "Reflexive Verben: sich freuen, sich erinnern, sich bedanken",
      summary: "Dönüşlü fiillerde eylem özneye geri döner. ich → mich, du → dich; er/sie/es ve çoğul kişilerde sich kullanılır.",
      logic: "Özne değişince dönüşlülük zamiri de değişir: Ich freue mich. Du freust dich. Wir freuen uns.",
      examples: ["Ich freue mich über die Nachricht.", "Er erinnert sich an den Termin.", "Wir bedanken uns für das Geschenk."],
      choices: [
        choice("Ich freue ___ sehr.", ["mich", "mir", "sich"], 0, "ich ile Akkusativ dönüşlü zamir: mich."),
        choice("Er erinnert ___ an die Feier.", ["sich", "ihn", "uns"], 0, "er ile sich."),
        choice("Wir bedanken ___ für Ihre Hilfe.", ["uns", "euch", "sich"], 0, "wir ile uns.")
      ],
      fills: [
        fill("Du freust", "auf den Urlaub.", ["dich"], "du → dich"),
        fill("Die Kollegen treffen", "um acht Uhr.", ["sich"], "çoğul özne → sich")
      ],
      order: order(["uns", "Wir", "Ihre", "bedanken", "Hilfe.", "für"], "Wir bedanken uns für Ihre Hilfe.", "sich bedanken für + Akkusativ."),
      speaking: ["Gratulieren Sie einer Kollegin und bedanken Sie sich.", "Worüber freuen Sie sich gerade?"],
      videos: [video("Ünite 10-11 ders videosu", drive.unit1011, "Ünite dersi"), video("Dönüşlü fiiller kısa gramer", drive.reflexive, "Kısa gramer"), video("Firma hakkında konuşma", drive.firm, "Konuşma")]
    },
    {
      id: 12,
      title: "Wenn es warm ist, essen wir meist Salat.",
      topic: "Ernährung",
      grammar: "Nebensatz mit wenn",
      summary: "wenn tekrarlanan şartları veya gelecekteki olasılıkları bağlar. Yan cümlede fiil sona gider. wenn cümlesi baştaysa ana cümlenin fiili hemen ardından gelir.",
      logic: "Wenn + şart (fiil sonda), sonuçta fiil öne gelir: Wenn es warm ist, essen wir Salat.",
      examples: ["Wenn ich Hunger habe, koche ich.", "Ich trinke Tee, wenn es kalt ist.", "Wenn wir Gäste haben, kaufen wir viel ein."],
      choices: [
        choice("___ ich wenig Zeit habe, esse ich ein Sandwich.", ["Wenn", "Dass", "Deshalb"], 0, "Şart/tekrarlanan durum: wenn."),
        choice("Wenn es warm ___, grillen wir.", ["ist", "sein", "wirdet"], 0, "wenn yan cümlesinde fiil sonda."),
        choice("Wenn wir Gäste haben, ___ wir Suppe.", ["kochen", "wir kochen", "gekocht"], 0, "Yan cümleden sonra ana fiil doğrudan gelir.")
      ],
      fills: [
        fill("", "ich müde bin, trinke ich Kaffee.", ["Wenn"], "şart bağlacı"),
        fill("Ich esse Obst, wenn ich Hunger", ".", ["habe"], "yan cümlede fiil sonda")
      ],
      order: order(["wir", "Wenn", "Salat.", "essen", "es", "warm", "ist,"], "Wenn es warm ist, essen wir Salat.", "wenn cümlesinden sonra ana fiil gelir."),
      speaking: ["Was essen Sie, wenn Sie wenig Zeit haben?", "Vergleichen Sie Essgewohnheiten im Sommer und Winter."],
      videos: [video("Ünite 12 ders videosu", drive.unit12only, "Ünite dersi"), video("Wenn/Dann kısa gramer", drive.wenn, "Kısa gramer"), video("Yemek konuşma kalıpları", drive.food, "Konuşma")]
    },
    {
      id: 13,
      title: "Meine erste Deutschlehrerin",
      topic: "Sprachen lernen",
      grammar: "Temporalsatz mit als",
      summary: "als geçmişte bir kez olan olayları veya geçmişteki bir dönemi anlatır. Yan cümlede çekimli fiil sona gider.",
      logic: "Geçmişte tek sefer/dönem = als. Tekrarlanan veya şimdiki şart için wenn kullanılır.",
      examples: ["Als ich zehn war, lernte ich Englisch.", "Ich war nervös, als der Kurs begann.", "Als Kind sprach sie zwei Sprachen."],
      choices: [
        choice("___ ich klein war, lebte ich in Izmir.", ["Als", "Wenn", "Dass"], 0, "Geçmişteki dönem: als."),
        choice("Als der Kurs begann, ___ ich sehr nervös.", ["war", "bin", "hatte sein"], 0, "Geçmiş durum: war."),
        choice("Ich lernte Deutsch, als ich in Berlin ___.", ["wohnte", "wohne", "gewohnt"], 0, "als yan cümlesinde Präteritum fiili sonda.")
      ],
      fills: [
        fill("", "ich 18 war, machte ich eine Reise.", ["Als"], "geçmişte tek dönem"),
        fill("Als wir in Wien waren,", "wir nur Deutsch.", ["sprachen"], "sprechen → sprachen")
      ],
      order: order(["war,", "Als", "Deutsch.", "lernte", "Kind", "ich", "ich"], "Als ich Kind war, lernte ich Deutsch.", "als yan cümlesinde war sonda."),
      speaking: ["Wie war Ihr erster Deutschkurs?", "Erzählen Sie von einer wichtigen Lernerfahrung."],
      videos: [video("Ünite 13-14 ders videosu", drive.unit1314, "Ünite dersi"), video("Bağlaçlar kısa gramer", drive.connectors, "Kısa gramer"), video("İletişim konuşma kalıpları", drive.communication, "Konuşma")]
    },
    {
      id: 14,
      title: "Es werden fleißig Päckchen gepackt.",
      topic: "Post und Telekommunikation",
      grammar: "Passiv Präsens: werden + Partizip II",
      summary: "Pasif cümlede işi yapan kişiden çok yapılan işlem önemlidir. werden kişi ve sayıya göre çekilir, Partizip II cümlenin sonunda durur.",
      logic: "Aktiv: Man packt das Paket. Passiv: Das Paket wird gepackt.",
      examples: ["Der Brief wird geschrieben.", "Die Pakete werden gebracht.", "Hier wird nicht geraucht."],
      choices: [
        choice("Das Paket ___ heute verschickt.", ["wird", "werden", "ist werden"], 0, "Tekil özne: wird."),
        choice("Die Briefe werden morgen ___.", ["abgeholt", "abholen", "abgeholtet"], 0, "Pasif: werden + Partizip II."),
        choice("Hier ___ viele Päckchen gepackt.", ["werden", "wird", "wurdet"], 0, "Çoğul Päckchen: werden.")
      ],
      fills: [
        fill("Die Karte", "unterschrieben.", ["wird"], "tekil pasif yardımcı fiil"),
        fill("Die Geschenke werden schön", ".", ["verpackt"], "verpacken → verpackt")
      ],
      order: order(["heute", "Das", "verschickt.", "wird", "Paket"], "Das Paket wird heute verschickt.", "werden 2. yerde, Partizip sonda."),
      speaking: ["Erklären Sie, wie ein Paket verschickt wird.", "Führen Sie ein kurzes Telefongespräch mit der Post."],
      videos: [video("Ünite 13-14 ders videosu", drive.unit1314, "Ünite dersi"), video("Passiv kısa gramer", drive.passive, "Kısa gramer"), video("Telefonda konuşma kalıpları", drive.phone, "Konuşma")]
    },
    {
      id: 15,
      title: "Gleich geht's los!",
      topic: "Medien",
      grammar: "Verben mit Dativ und Akkusativ; Reihenfolge der Objekte",
      summary: "Bazı fiiller hem bir kişiyi (Dativ) hem bir şeyi (Akkusativ) ister. İki isim varsa genellikle Dativ önce gelir. Zamir öne geçer.",
      logic: "Ich schenke meinem Bruder (kime?) eine DVD (neyi?). Ama: Ich schenke sie ihm.",
      examples: ["Er zeigt seiner Freundin den Film.", "Ich schenke ihm eine DVD.", "Ich schenke sie ihm."],
      choices: [
        choice("Sie zeigt ___ Kindern einen Film.", ["den", "die", "der"], 0, "Çoğul Dativ: den Kindern."),
        choice("Ich schenke meinem Bruder ___.", ["eine DVD", "einer DVD", "einem DVD"], 0, "Nesne Akkusativ: eine DVD."),
        choice("Ich gebe ___ ___. (das Buch / ihm)", ["es ihm", "ihm es", "ihn es"], 0, "İki zamirde Akkusativ önce: es ihm.")
      ],
      fills: [
        fill("Kannst du", "den Link schicken?", ["mir"], "kime? Dativ"),
        fill("Wir empfehlen unseren Freunden", "Serie.", ["die", "diese"], "neyi? Akkusativ")
      ],
      order: order(["eine", "Sie", "Freund", "DVD.", "ihrem", "schenkt"], "Sie schenkt ihrem Freund eine DVD.", "İsimlerde Dativ nesne önce gelir."),
      speaking: ["Empfehlen Sie einen Film oder eine Serie.", "Sagen Sie Ihre Meinung zu einem Fernsehprogramm."],
      videos: [video("Ünite 15-16 ders videosu", drive.unit1516, "Ünite dersi"), video("Dativ fiilleri kısa gramer", drive.dativ, "Kısa gramer"), video("Fikir belirtme kalıpları", drive.opinion, "Konuşma")]
    },
    {
      id: 16,
      title: "Darf ich fragen, ob ...?",
      topic: "Im Hotel",
      grammar: "Indirekte Fragen mit ob/W-Frage; lokale Präpositionen gegenüber, an ... vorbei, durch",
      summary: "Dolaylı soru, soruyu daha nazik yapar. Evet/hayır soruları ob ile; bilgi soruları soru kelimesiyle bağlanır. Çekimli fiil yan cümlenin sonuna gider.",
      logic: "Haben Sie ein Zimmer frei? → Darf ich fragen, ob Sie ein Zimmer frei haben?",
      examples: ["Wissen Sie, ob das Frühstück inklusive ist?", "Können Sie sagen, wo der Aufzug ist?", "Gehen Sie am Restaurant vorbei."],
      choices: [
        choice("Darf ich fragen, ___ Sie ein Zimmer frei haben?", ["ob", "dass", "weil"], 0, "Evet/hayır sorusu: ob."),
        choice("Wissen Sie, wie lange die Rezeption geöffnet ___?", ["ist", "sein", "hat"], 0, "Dolaylı soruda fiil sonda."),
        choice("Gehen Sie am Café ___.", ["vorbei", "durch", "gegenüber"], 0, "an ... vorbei = yanından geçmek.")
      ],
      fills: [
        fill("Können Sie mir sagen,", "der Frühstücksraum ist?", ["wo"], "yer sorusu için wo"),
        fill("Ich möchte wissen, ob WLAN inklusive", ".", ["ist"], "fiil en sonda")
      ],
      order: order(["Zimmer", "Darf", "haben?", "ob", "frei", "fragen,", "Sie", "ich", "ein"], "Darf ich fragen, ob Sie ein Zimmer frei haben?", "ob ile kurulan dolaylı soruda çekimli fiil sonda."),
      speaking: ["Buchen Sie telefonisch ein Hotelzimmer.", "Fragen Sie höflich nach Frühstück, WLAN und Parkplatz."],
      videos: [video("Ünite 15-16 ders videosu", drive.unit1516, "Ünite dersi"), video("Dolaylı anlatım kısa gramer", drive.indirect, "Kısa gramer"), video("Nezaket konuşma kalıpları", drive.polite, "Konuşma")]
    },
    {
      id: 17,
      title: "Wir wollen nach Rumänien.",
      topic: "Reisen und Verkehr",
      grammar: "Lokale Präpositionen: am/ans, im/ins, nach, zu",
      summary: "Yer ve yön edatları hedefin türüne göre değişir. Şehir/ülke için çoğunlukla nach; kişi ve kurum için zu; su kenarı için an; kapalı alan için in kullanılır.",
      logic: "Wo? am Meer / im Hotel. Wohin? ans Meer / ins Hotel. Ülke artikelsizse nach Rumänien.",
      examples: ["Wir fahren nach Rumänien.", "Im Sommer sind wir am Meer.", "Morgen gehen wir ins Reisebüro."],
      choices: [
        choice("Im August fahren wir ___ Türkei.", ["in die", "nach", "ans"], 0, "Artikelli ülke: in die Türkei."),
        choice("Die Kinder spielen ___ Meer.", ["am", "ans", "ins"], 0, "Wo? am Meer."),
        choice("Morgen gehen wir ___ Reisebüro.", ["ins", "im", "nach"], 0, "Wohin? in das → ins.")
      ],
      fills: [
        fill("Sie fliegen", "Berlin.", ["nach"], "şehir adlarıyla nach"),
        fill("Wir möchten", "Meer fahren.", ["ans", "an das"], "Wohin? an das → ans")
      ],
      order: order(["nach", "Wir", "fahren", "Rumänien.", "morgen"], "Wir fahren morgen nach Rumänien.", "Zaman orta alanda, hedef nach ile."),
      speaking: ["Wie reisen Sie am liebsten? Begründen Sie.", "Planen Sie eine Reise: Ziel, Verkehrsmittel und Unterkunft."],
      videos: [video("Ünite 17-18 ders videosu", drive.unit1718, "Ünite dersi"), video("Yer-yön zarfları kısa gramer", drive.local, "Kısa gramer"), video("Seyahat konuşma kalıpları", drive.travel, "Konuşma")]
    },
    {
      id: 18,
      title: "Ich freue mich auf Sonne und Wärme.",
      topic: "Wetter und Klima",
      grammar: "Verben mit Präpositionen; Frage- und Pronominaladverbien worauf/darauf",
      summary: "Bazı fiiller belirli bir edatla birlikte öğrenilir. Şeyler için wo(r)+edat ile sorar, da(r)+edat ile cevap veririz. Kişiler için edat + wen/wem kullanılır.",
      logic: "Worauf freust du dich? – Darauf. Ama kişi: Auf wen wartest du? – Auf Anna.",
      examples: ["Ich freue mich auf den Sommer.", "Worauf wartest du?", "Ich interessiere mich für das Klima."],
      choices: [
        choice("Ich freue mich ___ den Frühling.", ["auf", "über", "für"], 0, "Gelecek beklentisi: sich freuen auf."),
        choice("___ interessierst du dich? – Für das Wetter.", ["Wofür", "Worauf", "Für wen"], 0, "Şey için: wofür."),
        choice("Wir warten ___ besseres Wetter.", ["auf", "für", "an"], 0, "warten auf + Akkusativ.")
      ],
      fills: [
        fill("Ich interessiere mich", "Klimaschutz.", ["für"], "sich interessieren für"),
        fill("Worauf freust du dich? – Ich freue mich", ".", ["darauf"], "wo(r)- sorusuna da(r)- cevabı")
      ],
      order: order(["auf", "Wir", "Sonne.", "uns", "freuen"], "Wir freuen uns auf Sonne.", "sich freuen auf + Akkusativ."),
      speaking: ["Welches Wetter mögen Sie? Warum?", "Sprechen Sie über Ihre Pläne für einen sonnigen oder regnerischen Tag."],
      videos: [video("Ünite 17-18 ders videosu", drive.unit1718, "Ünite dersi"), video("A2 gramer alıştırmaları", drive.general, "Alıştırma"), video("Duygular konuşma kalıpları", drive.feelings, "Konuşma")]
    },
    {
      id: 19,
      title: "Wohin gehen wir heute?",
      topic: "Kulturelle Veranstaltungen",
      grammar: "Lokale Präpositionen: Woher? aus/von; Wohin? in/zu",
      summary: "Nereden geldiğimizi anlatırken kapalı alan ve şehir/ülke için aus, kişi veya etkinlik dönüşü için sıkça von kullanılır. Yön için hedefe göre in/zu seçilir.",
      logic: "aus dem Theater = binanın içinden; vom Konzert = etkinlikten. ins Theater = içine; zum Konzert = etkinliğe.",
      examples: ["Ich komme aus dem Kino.", "Wir kommen vom Konzert.", "Heute gehen wir ins Theater."],
      choices: [
        choice("Wir kommen gerade ___ Konzert.", ["vom", "aus den", "zum"], 0, "Etkinlikten dönüş: vom Konzert."),
        choice("Heute gehen wir ___ Theater.", ["ins", "im", "aus dem"], 0, "Wohin? in das → ins."),
        choice("Sie kommt ___ Konzerthalle.", ["aus der", "von die", "in der"], 0, "Binanın içinden: aus + Dativ.")
      ],
      fills: [
        fill("Morgen gehen wir", "Konzert.", ["zum", "zu dem"], "etkinliğe yön: zu"),
        fill("Er kommt gerade", "Kino.", ["aus dem"], "kapalı alanın içinden")
      ],
      order: order(["wir", "heute", "gehen", "Wohin", "Abend?"], "Wohin gehen wir heute Abend?", "Soru kelimesinden sonra fiil gelir."),
      speaking: ["Überzeugen Sie eine Freundin von einer Veranstaltung.", "Reagieren Sie auf drei Vorschläge: begeistert, zögernd, ablehnend."],
      videos: [video("A2 gramer alıştırmaları", drive.general, "Alıştırma"), video("Yer-yön zarfları kısa gramer", drive.local, "Kısa gramer"), video("Kültür-sanat konuşma kalıpları", drive.culture, "Konuşma")]
    },
    {
      id: 20,
      title: "Ich durfte eigentlich keine Comics lesen.",
      topic: "Bücher und Presse",
      grammar: "Präteritum der Modalverben: durfte, konnte, musste, wollte, sollte",
      summary: "Modal fiiller konuşmada geçmiş anlatırken çoğunlukla Präteritum kullanır. Umlaut düşer ve çekimli modal 2. yerde, ana fiil sonda kalır.",
      logic: "dürfen → durfte, können → konnte, müssen → musste. Ana fiil mastar hâlinde sonda: Ich durfte lesen.",
      examples: ["Ich durfte lange aufbleiben.", "Wir mussten viel lesen.", "Er konnte schon schreiben."],
      choices: [
        choice("Als Kind ___ ich keine Comics lesen.", ["durfte", "dürfte", "gedurft"], 0, "dürfen Präteritum: durfte."),
        choice("Wir ___ jeden Tag Hausaufgaben machen.", ["mussten", "müssten", "gemusst"], 0, "Geçmiş zorunluluk: mussten."),
        choice("Sie ___ mit sechs schon lesen.", ["konnte", "könnte", "kann"], 0, "Geçmiş beceri: konnte.")
      ],
      fills: [
        fill("Früher", "ich um acht ins Bett gehen.", ["musste"], "müssen Präteritum"),
        fill("Mein Bruder", "keine Zeitung lesen.", ["wollte"], "wollen Präteritum")
      ],
      order: order(["keine", "Ich", "lesen.", "durfte", "Comics"], "Ich durfte keine Comics lesen.", "Modal fiil 2., ana fiil sonda."),
      speaking: ["Was durften oder mussten Sie als Kind?", "Welche Bücher lesen Sie gern? Drücken Sie Interesse aus."],
      videos: [video("A2 gramer alıştırmaları", drive.general, "Alıştırma"), video("Präteritum kısa gramer", drive.praeteritum, "Kısa gramer"), video("Fikir belirtme kalıpları", drive.opinion, "Konuşma")]
    },
    {
      id: 21,
      title: "Ja genau, den meine ich.",
      topic: "Staat und Verwaltung",
      grammar: "Frageartikel welch-; Demonstrativpronomen dies-/der/das/die; Verb lassen",
      summary: "welch- bir gruptan seçim sorar ve artikel gibi çekilir. der/die/das veya dies- daha önce söylenen ismin yerini tutabilir. lassen bir işi yaptırma ya da bir şeyi bırakma anlamı verir.",
      logic: "Welchen Ausweis? – Den hier. İsmi tekrar etmiyoruz; zamir hâle göre değişiyor.",
      examples: ["Welchen Antrag meinen Sie? – Den hier.", "Welche Nummer brauchen Sie? – Diese.", "Ich lasse mein Foto machen."],
      choices: [
        choice("___ Formular brauchen Sie?", ["Welches", "Welcher", "Welchen"], 0, "das Formular, Akkusativ: welches."),
        choice("Meinen Sie den blauen Ausweis? – Ja, ___ meine ich.", ["den", "der", "dem"], 0, "Akkusativ maskulin zamir: den."),
        choice("Ich ___ morgen meinen Pass verlängern.", ["lasse", "lasst", "gelassen"], 0, "ich lasse + nesne + mastar.")
      ],
      fills: [
        fill("", "Termin passt Ihnen?", ["Welcher"], "der Termin, Nominativ"),
        fill("Die rote Nummer? – Ja,", "meine ich.", ["die"], "die Nummer yerine Akkusativ die")
      ],
      order: order(["Foto", "Ich", "machen.", "mein", "lasse"], "Ich lasse mein Foto machen.", "lassen + nesne + mastar."),
      speaking: ["Bitten Sie am Amt um ein Formular.", "Beschreiben Sie ein Problem mit einem Dokument."],
      videos: [video("Ünite 21-22 ders videosu", drive.unit2122, "Ünite dersi"), video("Welch-/Alle kısa gramer", drive.welch, "Kısa gramer"), video("lassen kısa gramer", drive.lassen, "Kısa gramer")]
    },
    {
      id: 22,
      title: "Seit ich meinen Wagen verkauft habe, ...",
      topic: "Mobilität und Verkehr",
      grammar: "Temporale Konnektoren seit(dem) und bis",
      summary: "seit(dem) geçmişte başlayıp bugüne etkisi süren durumu bağlar. bis bir bitiş noktasına kadar olan süreyi gösterir. İkisinde de yan cümle fiili sona gider.",
      logic: "Seit ich kein Auto habe, fahre ich Rad. / Warte, bis der Bus kommt.",
      examples: ["Seit ich umgezogen bin, fahre ich Rad.", "Warte, bis die Ampel grün ist.", "Seitdem spare ich viel Geld."],
      choices: [
        choice("___ ich mein Auto verkauft habe, fahre ich Bus.", ["Seit", "Bis", "Dass"], 0, "Başlangıçtan bugüne etki: seit."),
        choice("Warte hier, ___ der Bus kommt.", ["bis", "seit", "weil"], 0, "Bitiş noktasına kadar: bis."),
        choice("Seitdem ___ ich mehr zu Fuß.", ["gehe", "ich gehe", "gegangen"], 0, "Seitdem ana cümle bağlayıcısıdır; fiil hemen gelir.")
      ],
      fills: [
        fill("", "ich in der Stadt wohne, brauche ich kein Auto.", ["Seit"], "başlangıçtan beri"),
        fill("Bleiben Sie hier,", "die Polizei kommt.", ["bis"], "... gelene kadar")
      ],
      order: order(["verkauft", "Seit", "Rad.", "habe,", "fahre", "Auto", "ich", "mein", "ich"], "Seit ich mein Auto verkauft habe, fahre ich Rad.", "seit yan cümlesinde habe sonda."),
      speaking: ["Erklären Sie, wie Sie sich in der Stadt bewegen.", "Geben Sie eine kurze Anleitung für ein Online-Ticket."],
      videos: [video("Ünite 21-22 ders videosu", drive.unit2122, "Ünite dersi"), video("Bağlaçlar kısa gramer", drive.connectors, "Kısa gramer"), video("Seyahat konuşma kalıpları", drive.travel, "Konuşma")]
    },
    {
      id: 23,
      title: "Der Beruf, der zu mir passt.",
      topic: "Ausbildung und Beruf",
      grammar: "Relativpronomen und Relativsatz im Nominativ/Akkusativ",
      summary: "Relativsatz bir ismi ek bilgiyle açıklar. Relativ zamirin cinsi önceki isme, hâli ise yan cümledeki görevine göre belirlenir. Fiil sona gider.",
      logic: "Das ist der Beruf. Der Beruf passt zu mir. → Das ist der Beruf, der zu mir passt.",
      examples: ["Das ist der Beruf, der zu mir passt.", "Ich suche eine Arbeit, die Spaß macht.", "Das ist das Buch, das ich brauche."],
      choices: [
        choice("Das ist der Kurs, ___ morgen beginnt.", ["der", "den", "dem"], 0, "Relativ cümlede özne: der."),
        choice("Ich suche eine Stelle, ___ ich interessant finde.", ["die", "der", "den"], 0, "die Stelle, Akkusativ yine die."),
        choice("Das ist das Buch, ___ ich gelesen habe.", ["das", "der", "den"], 0, "das Buch, Akkusativ: das.")
      ],
      fills: [
        fill("Ich möchte einen Beruf,", "mir Freude macht.", ["der"], "der Beruf, Relativsatzta özne"),
        fill("Das ist die Schule,", "ich besucht habe.", ["die"], "die Schule, Akkusativ")
      ],
      order: order(["zu", "Das", "passt.", "Beruf,", "ist", "mir", "der", "der"], "Das ist der Beruf, der zu mir passt.", "Relativsatzta fiil sonda."),
      speaking: ["Beschreiben Sie den Beruf, der zu Ihnen passt.", "Sprechen Sie über Zufriedenheit und Unzufriedenheit bei der Arbeit."],
      videos: [video("Ünite 23-24 ders videosu", drive.unit2324, "Ünite dersi"), video("A2 gramer alıştırmaları", drive.general, "Alıştırma"), video("Başvuru/CV konuşma kalıpları", drive.cv, "Konuşma")]
    },
    {
      id: 24,
      title: "Wie sah dein Alltag aus?",
      topic: "Arbeiten im Ausland",
      grammar: "Präteritum: regelmäßige und unregelmäßige Verben",
      summary: "Yazılı anlatımda ve hikâyelerde geçmiş için Präteritum yaygındır. Düzenli fiiller -te alır; düzensiz fiillerin kökü değişebilir.",
      logic: "arbeiten → arbeitete; sagen → sagte. kommen → kam; sehen → sah. Özneye göre kişi eki eklenir.",
      examples: ["Ich arbeitete ein Jahr in Wien.", "Dann kam ich nach Berlin.", "Der Alltag sah anders aus."],
      choices: [
        choice("Letztes Jahr ___ ich in Zürich.", ["arbeitete", "arbeite", "gearbeitet"], 0, "Düzenli Präteritum: arbeitete."),
        choice("Danach ___ ich nach Hause.", ["kam", "komme", "gekommt"], 0, "kommen Präteritum: kam."),
        choice("Meine Kollegin ___ mir alles.", ["zeigte", "zeigen", "gezeigt"], 0, "zeigen Präteritum: zeigte.")
      ],
      fills: [
        fill("Früher", "mein Alltag ganz anders aus.", ["sah"], "sehen → sah"),
        fill("Wir", "jeden Morgen um sieben an.", ["fingen"], "anfangen → fingen ... an")
      ],
      order: order(["Jahr", "Ich", "Wien.", "ein", "arbeitete", "in"], "Ich arbeitete ein Jahr in Wien.", "Präteritum fiili 2. yerde."),
      speaking: ["Wie sah Ihr Alltag vor fünf Jahren aus?", "Erzählen Sie von einer Reise oder Arbeitserfahrung im Ausland."],
      videos: [video("Ünite 23-24 ders videosu", drive.unit2324, "Ünite dersi"), video("Präteritum kısa gramer", drive.praeteritum, "Kısa gramer"), video("Yaşam konuşma kalıpları", drive.life, "Konuşma")]
    }
  ];

  units.forEach((unit) => {
    unit.book = unit.id <= 12 ? "A2.1" : "A2.2";
    unit.module = Math.ceil(unit.id / 3);
  });

  window.AYDA_UNITS = units;
})();
