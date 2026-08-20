(function () {
  "use strict";

  const units = Array.isArray(window.AYDA_UNITS) ? window.AYDA_UNITS : [];

  const packs = [
    {
      words: [["der Beruf", "meslek"], ["die Bäckerei", "fırın"], ["der Onkel", "amca / dayı"], ["die Großeltern", "büyükanne ve büyükbaba"]],
      short: ["Was war dein Opa von Beruf?", ["Er war Bäcker."], "Geçmişteki meslek için war kullanılır."],
      visual: ["👴🥖", "Görsel ipucuna göre dede hakkında iki cümle yaz.", "Mein Opa war Bäcker. Er hatte eine kleine Bäckerei."],
      reading: ["Marias Großeltern hatten früher eine kleine Bäckerei. Ihr Opa war Bäcker und ihre Oma bediente die Kunden.", "Was war Marias Opa von Beruf?", ["Bäcker", "Kellner", "Arzt"], 0, "Metinde 'Ihr Opa war Bäcker' deniyor."],
      correction: ["Das ist unsere Onkel.", ["Das ist unser Onkel."], "Onkel eril ve Nominativ olduğu için unser kullanılır."],
      tf: ["war, sein fiilinin Präteritum biçimidir.", true, "sein → war / waren."],
      dialogue: ["A: Was waren deine Großeltern von Beruf? B: ___", ["Sie waren Lehrer.", "Sie sind gestern.", "Sie hatten nett."], 0, "Meslek geçmişte sein fiiliyle anlatılır."],
      translation: ["Bizim dedem fırıncıydı.", ["Unser Opa war Bäcker."], "unser Opa + war + Bäcker"],
      tense: ["Früher ___ meine Oma ein Café.", ["hatte", "hat", "haben"], 0, "Früher geçmişi gösterir; haben → hatte."],
      plural: ["der Beruf → ?", ["die Berufe", "Berufe"], "Beruf kelimesinin çoğulu Berufe'dir."],
      article: ["Bäckerei", "die", "-ei ile biten bu isim dişildir: die Bäckerei."],
      verb: ["wir / sein / Präteritum", ["waren", "wir waren"], "wir ile sein fiilinin geçmiş biçimi waren olur."],
      paragraph: ["Ailenden iki kişiyi 3 kısa cümleyle tanıt.", "Meine Oma war Lehrerin. Mein Opa hatte ein Geschäft. Heute wohnen sie auf dem Land."],
      redemittel: ["Bir aile hikâyesine geçmiş zamanla başla.", "Früher war mein Opa Bäcker. Damals hatte er eine kleine Bäckerei."],
      summary: ["Bu ünitede geçmişteki durum ve sahiplik en çok hangi biçimlerle anlatılır?", "war / waren ve hatte / hatten", "werde ve würde", "bin ve habe", "war/hatte geçmişteki durum ve sahipliği anlatır."]
    },
    {
      words: [["das Möbel", "mobilya"], ["die Kommode", "şifonyer"], ["die Schublade", "çekmece"], ["der Umzug", "taşınma"]],
      short: ["Wo steht die Lampe?", ["Sie steht neben dem Sofa.", "Die Lampe steht neben dem Sofa."], "Wo? sorusunda sabit konum ve Dativ kullanılır."],
      visual: ["🛋️💡", "Lambanın koltuğun yanında olduğunu ve sonra masanın üstüne konduğunu yaz.", "Die Lampe steht neben dem Sofa. Ich stelle sie auf den Tisch."],
      reading: ["Nina zieht heute um. Der Tisch kommt ans Fenster, die Kommode steht später neben der Tür und den Teppich legt sie vor das Sofa.", "Wo steht die Kommode später?", ["Neben der Tür", "Vor dem Sofa", "Am Fenster"], 0, "Kommode için 'neben der Tür' bilgisi veriliyor."],
      correction: ["Ich stelle die Lampe auf dem Tisch.", ["Ich stelle die Lampe auf den Tisch."], "stellen hareket bildirir; Wohin? + Akkusativ gerekir."],
      tf: ["Wo? sorusu Wechselpräposition ile genellikle Dativ ister.", true, "Sabit konumda Dativ kullanılır."],
      dialogue: ["A: Wohin soll die Kommode? B: ___", ["Stell sie neben die Tür.", "Sie steht neben der Tür?", "Aus der Tür."], 0, "Wohin? için hareket ve Akkusativ gerekir."],
      translation: ["Anahtarlar çekmecede duruyor.", ["Die Schlüssel liegen in der Schublade."], "Wo? → in der Schublade"],
      tense: ["Die Schlüssel ___ in der Schublade.", ["liegen", "legen", "stellt"], 0, "liegen sabit konumu anlatır."],
      plural: ["das Möbel → ?", ["die Möbel", "Möbel"], "Möbel tekil ve çoğulda aynı biçimdedir."],
      article: ["Kommode", "die", "Doğru artikel die Kommode'dir."],
      verb: ["ich / stellen / Präsens", ["stelle", "ich stelle"], "ich ile stellen → stelle."],
      paragraph: ["Oturma odandaki üç eşyanın yerini anlat.", "Das Sofa steht an der Wand. Der Teppich liegt vor dem Sofa. Die Lampe steht neben dem Fenster."],
      redemittel: ["Taşınırken bir yerleştirme önerisi yap.", "Stell die Kommode doch neben die Tür. Den Teppich kannst du vor das Sofa legen."],
      summary: ["Hareket ile sabit konumu ayıran doğru kural hangisidir?", "Wo? + Dativ, Wohin? + Akkusativ", "Wo? + Akkusativ, Wohin? + Dativ", "Her ikisi de yalnız Nominativ", "Wo sabit konumu, Wohin yönü gösterir."]
    },
    {
      words: [["der Vermieter", "ev sahibi / kiraya veren"], ["die Erholung", "dinlenme"], ["die Anmeldung", "kayıt"], ["der Wanderer", "yürüyüşçü"]],
      short: ["Wo erholst du dich am besten?", ["Ich erhole mich am besten am Meer."], "am besten ile tercih belirtilebilir."],
      visual: ["🏞️🥾", "Görsele uygun iki turizm cümlesi yaz.", "Hier können Wanderer in der Natur Ruhe finden. Die Erholung am See ist wunderbar."],
      reading: ["Unser Gästehaus liegt am See. Wanderer finden hier Ruhe und Erholung. Die Anmeldung für die Radtour ist an der Rezeption möglich.", "Wo kann man sich für die Radtour anmelden?", ["An der Rezeption", "Am Bahnhof", "Im Restaurant"], 0, "Kayıt yeri resepsiyon olarak veriliyor."],
      correction: ["Die Anmelderung ist online möglich.", ["Die Anmeldung ist online möglich."], "anmelden fiilinden isim die Anmeldung olur."],
      tf: ["-ung ile biten isimler genellikle die artikelini alır.", true, "Örneğin die Anmeldung, die Erholung."],
      dialogue: ["A: Was bietet das Hotel? B: ___", ["Es bietet Ruhe und Erholung.", "Es wandert einen Gast.", "Es ist anmelden."], 0, "bieten + Akkusativ ile imkân sunulur."],
      translation: ["Burada huzur ve dinlenme bulabilirsiniz.", ["Hier finden Sie Ruhe und Erholung."], "Hier + finden Sie + nesne"],
      tense: ["Jemand, der Wohnungen vermietet, ist ein ___.", ["Vermieter", "Vermietung", "vermieten"], 0, "Kişi adı için -er kullanılır."],
      plural: ["der Wanderer → ?", ["die Wanderer", "Wanderer"], "Bu isim çoğulda biçim değiştirmez."],
      article: ["Erholung", "die", "-ung ile biten isim: die Erholung."],
      verb: ["er / sich erholen / Präsens", ["erholt sich", "er erholt sich"], "Dönüşlü zamir fiilden sonra gelir."],
      paragraph: ["Sakin bir tatil yerini 3 cümleyle tanıt.", "Das Gästehaus liegt am See. Dort finden Gäste Ruhe und Erholung. Man kann auch wandern."],
      redemittel: ["Bir tatil yerini tavsiye et.", "Ich würde dieses Gästehaus empfehlen, weil es ruhig ist und direkt am See liegt."],
      summary: ["Fiilden süreç veya sonuç adı üretmek için hangi ek sık kullanılır?", "-ung", "-chen", "-los", "Anmeldung ve Erholung, -ung ile kurulmuş isimlerdir."]
    },
    {
      words: [["der Käse", "peynir"], ["die Birne", "armut"], ["das Brot", "ekmek"], ["die Packung", "paket"]],
      short: ["Was darf es sein?", ["Ich hätte gern einen milden Käse."], "Ich hätte gern ... nazik sipariş kalıbıdır."],
      visual: ["🧀🍞", "Görseldeki iki ürünü sıfatla sipariş et.", "Ich hätte gern einen milden Käse und ein frisches Brot."],
      reading: ["Im neuen Bistro bestellt Lea eine warme Suppe und einen kleinen Salat. Ihr Freund nimmt ein kaltes Getränk.", "Was bestellt Lea?", ["Suppe und Salat", "Getränk und Käse", "Nur Kaffee"], 0, "Lea warme Suppe ve kleinen Salat sipariş ediyor."],
      correction: ["Ich nehme einen frisches Brot.", ["Ich nehme ein frisches Brot."], "Brot nötrdür: ein frisches Brot."],
      tf: ["Akkusativ maskulin yapıda 'einen milden Käse' doğrudur.", true, "einen sonrası sıfat -en alır."],
      dialogue: ["A: Was darf es sein? B: ___", ["Ich hätte gern 200 Gramm Käse.", "Ich bin 200 Gramm.", "Der Käse darf."], 0, "Miktar + ürünle nazik sipariş verilir."],
      translation: ["Taze bir ekmek istiyorum.", ["Ich hätte gern ein frisches Brot.", "Ich möchte ein frisches Brot."], "ein frisches Brot"],
      tense: ["Wir brauchen ein ___ Brot.", ["frisches", "frische", "frischen"], 0, "Nötr Akkusativte ein frisches Brot denir."],
      plural: ["die Birne → ?", ["die Birnen", "Birnen"], "Çoğul biçim Birnen'dir."],
      article: ["Käse", "der", "Doğru artikel der Käse'dir."],
      verb: ["ich / nehmen / Präsens", ["nehme", "ich nehme"], "ich ile nehmen → nehme."],
      paragraph: ["Marketten alacağın üç ürünü miktarlarıyla yaz.", "Ich brauche ein Brot, eine Packung Reis und 200 Gramm Käse."],
      redemittel: ["Şarküteride nazikçe sipariş ver.", "Guten Tag. Ich hätte gern 200 Gramm milden Käse, bitte."],
      summary: ["Belirsiz artikelden sonra Akkusativ maskulin sıfat sonu hangisidir?", "-en", "-e", "-es", "einen milden Käse yapısında sıfat -en alır."]
    },
    {
      words: [["der Dom", "katedral"], ["das Rathaus", "belediye binası"], ["die Kirche", "kilise"], ["die Ausstellung", "sergi"]],
      short: ["Was möchtest du in der Stadt besichtigen?", ["Ich möchte den alten Dom besichtigen."], "besichtigen Akkusativ nesne alır."],
      visual: ["🏛️⛪", "İki yapıyı sıfat kullanarak tanıt.", "Das ist das alte Rathaus. Daneben steht die berühmte Kirche."],
      reading: ["Die Stadtführung beginnt am alten Rathaus. Danach sehen die Gäste den modernen Bahnhof. Der bekannte Dom ist die letzte Station.", "Welche Station kommt zuletzt?", ["Der Dom", "Der Bahnhof", "Das Rathaus"], 0, "Metin Dom'un son durak olduğunu söylüyor."],
      correction: ["Wir besuchen den alte Markt.", ["Wir besuchen den alten Markt."], "den sonrası sıfat -en alır."],
      tf: ["Belirli artikelden sonra Nominativ tekilde sıfat çoğunlukla -e alır.", true, "der berühmte Dom, die alte Kirche."],
      dialogue: ["A: Wie findest du den neuen Marktplatz? B: ___", ["Ich finde ihn sehr schön.", "Ich finde er sehr schön.", "Er findet mich."], 0, "den Marktplatz yerine Akkusativ zamiri ihn gelir."],
      translation: ["Ünlü katedrali ziyaret ediyoruz.", ["Wir besuchen den berühmten Dom."], "den + berühmten + Dom"],
      tense: ["Das ist der ___ Dom.", ["berühmte", "berühmten", "berühmter"], 0, "Nominativ maskulin: der berühmte Dom."],
      plural: ["die Kirche → ?", ["die Kirchen", "Kirchen"], "Çoğul Kirchen'dir."],
      article: ["Rathaus", "das", "Doğru artikel das Rathaus'tur."],
      verb: ["wir / besichtigen / Präsens", ["besichtigen", "wir besichtigen"], "wir biçimi mastarla aynıdır."],
      paragraph: ["Şehrindeki iki yeri kısa bir tur planıyla tanıt.", "Zuerst besuchen wir das alte Rathaus. Danach sehen wir den großen Park. Zum Schluss gehen wir zum Dom."],
      redemittel: ["Bir şehir turu öner.", "Wir könnten zuerst den alten Marktplatz besichtigen und danach ins Museum gehen."],
      summary: ["Belirli artikelden sonra Akkusativ maskulin örnek hangisidir?", "den alten Markt", "der alten Markt", "das alter Markt", "den ile sıfat -en alır."]
    },
    {
      words: [["das Konzert", "konser"], ["die Veranstaltung", "etkinlik"], ["der Chor", "koro"], ["die Bühne", "sahne"]],
      short: ["Seit wann singst du im Chor?", ["Ich singe seit einem Jahr im Chor."], "seit + Dativ ve hâlâ süren durum."],
      visual: ["🎭🎶", "Etkinliğin ne zaman olduğunu ve ne kadar sürdüğünü yaz.", "Das Konzert war vor einer Woche. Es dauerte über zwei Stunden."],
      reading: ["Mert spielt seit drei Jahren Theater. Vor einem Monat hatte seine Gruppe Premiere. Das Stück lief über zwei Wochen.", "Wie lange lief das Stück?", ["Über zwei Wochen", "Drei Jahre", "Einen Monat"], 0, "Süre 'über zwei Wochen' olarak veriliyor."],
      correction: ["Seit drei Jahren spielte ich noch im Chor.", ["Seit drei Jahren spiele ich im Chor."], "seit ile hâlâ süren durumda Präsens kullanılır."],
      tf: ["vor einer Woche, 'bir hafta önce' anlamına gelir.", true, "vor geçmişteki uzaklığı gösterir."],
      dialogue: ["A: Gehen wir am Samstag ins Konzert? B: ___", ["Ja, das passt mir gut.", "Seit Samstag war.", "Über Konzert."], 0, "Öneriyi kabul etmek için bu kalıp doğaldır."],
      translation: ["Bir yıldır koroda şarkı söylüyorum.", ["Ich singe seit einem Jahr im Chor."], "seit + Dativ"],
      tense: ["Das Festival war ___ zwei Wochen.", ["vor", "seit", "von"], 0, "Geçmişte 'iki hafta önce': vor."],
      plural: ["das Konzert → ?", ["die Konzerte", "Konzerte"], "Çoğul Konzerte'dir."],
      article: ["Veranstaltung", "die", "Doğru artikel die Veranstaltung'dur."],
      verb: ["sie / tanzen / Perfekt", ["hat getanzt", "sie hat getanzt"], "Perfekt: haben + getanzt."],
      paragraph: ["Sevdiğin bir etkinliği zaman bilgileriyle anlat.", "Seit zwei Jahren gehe ich zu diesem Festival. Das letzte Konzert war vor einem Monat. Es dauerte über drei Stunden."],
      redemittel: ["Bir etkinlik öner ve arkadaşınla anlaş.", "Wie wäre es mit dem Konzert am Freitag? - Gute Idee, das passt mir."],
      summary: ["Hâlâ devam eden bir başlangıç için hangi edat kullanılır?", "seit", "vor", "gegen", "seit geçmişte başlayıp süren durumu gösterir."]
    },
    {
      words: [["das Training", "antrenman"], ["der Rücken", "sırt"], ["das Schwimmbad", "yüzme havuzu"], ["der Ratschlag", "tavsiye"]],
      short: ["Was sollte ich gegen Rückenschmerzen tun?", ["Du solltest Yoga machen."], "solltest tavsiye verir."],
      visual: ["🏃‍♀️🏊", "İki spor için yumuşak bir öneri yaz.", "Wir könnten montags joggen und mittwochs schwimmen gehen."],
      reading: ["Lina möchte mehr Sport machen. Tom schlägt vor: Wir könnten dienstags schwimmen. Lina arbeitet dann lange.", "Warum kann Lina dienstags nicht?", ["Sie arbeitet lange.", "Sie ist im Urlaub.", "Das Schwimmbad ist zu."], 0, "Metin salı günü uzun çalıştığını belirtiyor."],
      correction: ["Du solltet mehr Pausen machen.", ["Du solltest mehr Pausen machen."], "du ile sollte → solltest."],
      tf: ["könnten, öneriyi daha yumuşak yapabilir.", true, "Wir könnten ... nazik bir öneridir."],
      dialogue: ["A: Ich möchte fitter werden. B: ___", ["Du solltest regelmäßig trainieren.", "Du trainiert gestern.", "Du könntet ich."], 0, "Tavsiye için solltest kullanılır."],
      translation: ["Pazartesileri koşuya çıkabiliriz.", ["Wir könnten montags joggen gehen."], "könnten 2. yerde, ana fiiller sonda"],
      tense: ["___ wir morgen Rad fahren?", ["Könnten", "Solltest", "Könnte"], 0, "wir ile könnten kullanılır."],
      plural: ["das Training → ?", ["die Trainings", "Trainings"], "Çoğul Trainings'dir."],
      article: ["Rücken", "der", "Doğru artikel der Rücken'dir."],
      verb: ["du / sollen / Konjunktiv II", ["solltest", "du solltest"], "du solltest = yapmalısın / iyi olur."],
      paragraph: ["Bir haftalık kısa spor planı yaz.", "Montags gehe ich joggen. Mittwochs könnte ich schwimmen. Am Wochenende sollte ich mich erholen."],
      redemittel: ["Arkadaşına iki spor önerisi yap.", "Wir könnten zusammen joggen. Du solltest außerdem einmal pro Woche schwimmen."],
      summary: ["Yumuşak öneri ve tavsiye için doğru ikili hangisidir?", "könnte / sollte", "musste / durfte", "werde / wurde", "könnte öneri, sollte tavsiye verir."]
    },
    {
      words: [["die Kopfschmerzen", "baş ağrısı"], ["das Fieber", "ateş"], ["der Arzt", "doktor"], ["die Tablette", "tablet / hap"]],
      short: ["Warum bleibst du heute zu Hause?", ["Ich bleibe zu Hause, weil ich Fieber habe."], "weil yan cümlesinde fiil sona gider."],
      visual: ["🤒🩺", "Hastalığın nedenini ve sonucunu iki cümleyle yaz.", "Ich habe starke Kopfschmerzen. Deshalb gehe ich zum Arzt."],
      reading: ["Elif hat seit gestern starke Kopfschmerzen. Deshalb ruft sie in der Praxis an. Sie geht nicht ins Büro, weil die Ärztin ihr Ruhe empfiehlt.", "Warum geht Elif nicht ins Büro?", ["Die Ärztin empfiehlt Ruhe.", "Sie hat Urlaub.", "Das Büro ist geschlossen."], 0, "weil cümlesi sebebi veriyor."],
      correction: ["Ich bleibe im Bett, weil ich habe Fieber.", ["Ich bleibe im Bett, weil ich Fieber habe."], "weil yan cümlesinde çekimli fiil sonda olur."],
      tf: ["deshalb sonuç bildirir ve ardından çekimli fiil gelir.", true, "Deshalb bleibe ich zu Hause."],
      dialogue: ["A: Ich habe starke Kopfschmerzen. B: ___", ["Du solltest zum Arzt gehen.", "Weil du gehst.", "Deshalb Fieber."], 0, "Sağlık tavsiyesi için solltest uygundur."],
      translation: ["Ateşim olduğu için yatakta kalıyorum.", ["Ich bleibe im Bett, weil ich Fieber habe."], "weil + özne + ... + fiil"],
      tense: ["Mira ist krank. ___ bleibt sie zu Hause.", ["Deshalb", "Weil", "Dass"], 0, "İkinci cümle sonucu bildiriyor."],
      plural: ["der Arzt → ?", ["die Ärzte", "Ärzte"], "Çoğulda a → ä olur: Ärzte."],
      article: ["Tablette", "die", "Doğru artikel die Tablette'dir."],
      verb: ["ich / haben / Präsens", ["habe", "ich habe"], "ich habe Fieber."],
      paragraph: ["Bir hastalık durumunu neden ve sonuçla anlat.", "Ich bin erkältet, weil ich gestern im Regen war. Deshalb bleibe ich heute zu Hause und trinke Tee."],
      redemittel: ["Hasta birine geçmiş olsun de ve tavsiye ver.", "Gute Besserung! Du solltest dich ausruhen und viel Wasser trinken."],
      summary: ["Neden cümlesinde fiili sona gönderen bağlaç hangisidir?", "weil", "deshalb", "trotzdem", "weil yan cümlesinde fiil sonda kalır."]
    },
    {
      words: [["die Arbeitszeit", "çalışma saati"], ["das Gehalt", "maaş"], ["der Kollege", "iş arkadaşı"], ["die Beratung", "danışmanlık"]],
      short: ["Was ist dir bei der Arbeit wichtig?", ["Mir sind flexible Arbeitszeiten wichtig."], "Artikelsiz çoğulda sıfat -e alır."],
      visual: ["🏢🤝", "İyi bir iş yerini iki sıfatla anlat.", "Gutes Betriebsklima und nette Kollegen sind mir wichtig."],
      reading: ["Autofix produziert moderne Elektroautos. Gute Qualität und schneller Service sind der Firma wichtig. Kunden bekommen kostenlose Beratung.", "Was ist der Firma wichtig?", ["Qualität und Service", "Nur niedrige Preise", "Alte Technik"], 0, "Metinde kalite ve hızlı servis belirtiliyor."],
      correction: ["Er sucht gute Betriebsklima.", ["Er sucht gutes Betriebsklima."], "Nötr Akkusativ ve artikelsiz: gutes."],
      tf: ["Artikel yoksa sıfat, cins ve hâl bilgisini sonunda gösterebilir.", true, "Örneğin gutes Gehalt."],
      dialogue: ["A: Was bietet die Firma? B: ___", ["Sie bietet flexible Arbeitszeiten.", "Sie bietet flexibler Zeit.", "Sie ist Kollegen."], 0, "Çoğul Akkusativ artikelsiz: flexible Arbeitszeiten."],
      translation: ["İyi maaş ve esnek çalışma saatleri arıyorum.", ["Ich suche gutes Gehalt und flexible Arbeitszeiten."], "Nullartikel sonrası sıfat sonlarına dikkat."],
      tense: ["Sie arbeitet mit ___ Kollegen.", ["netten", "nette", "netter"], 0, "mit + Dativ çoğul: netten Kollegen."],
      plural: ["der Kollege → ?", ["die Kollegen", "Kollegen"], "N-deklination: Kollege → Kollegen."],
      article: ["Gehalt", "das", "Doğru artikel das Gehalt'tır."],
      verb: ["die Firma / bieten / Präsens", ["bietet", "die Firma bietet"], "3. tekil kişi bietet."],
      paragraph: ["İdeal iş yerini 3 cümleyle anlat.", "Gutes Gehalt ist mir wichtig. Ich möchte flexible Arbeitszeiten und nette Kollegen. Die Firma sollte Weiterbildung bieten."],
      redemittel: ["Bir firma hakkında olumlu görüş bildir.", "Ich finde die Firma interessant, weil sie gute Arbeitsbedingungen bietet."],
      summary: ["Artikelsiz nötr bir isimle doğru örnek hangisidir?", "gutes Gehalt", "gute Gehalt", "guten Gehalt", "Artikel yoksa nötr isimde sıfat -es alır."]
    },
    {
      words: [["die Reservierung", "rezervasyon"], ["die Rechnung", "hesap"], ["der Service", "servis / hizmet"], ["das Trinkgeld", "bahşiş"]],
      short: ["Was findest du gut?", ["Ich finde gut, dass du reserviert hast."], "dass yan cümlesinde fiil sonda olur."],
      visual: ["🍽️🧾", "Restorandaki durumu dass ile iki cümlede anlat.", "Gut, dass wir einen Tisch reserviert haben. Ich hoffe, dass der Service schnell ist."],
      reading: ["Nora schreibt Ben, dass sie zehn Minuten später kommt. Ben antwortet, dass der Tisch schon reserviert ist.", "Was ist schon reserviert?", ["Der Tisch", "Das Taxi", "Das Hotel"], 0, "Ben masanın rezerve olduğunu söylüyor."],
      correction: ["Ich hoffe, dass ist das Essen lecker.", ["Ich hoffe, dass das Essen lecker ist."], "dass yan cümlesinde özne başta, fiil sonda olur."],
      tf: ["dass cümlesi bir düşünceyi veya bilgiyi ana cümleye bağlar.", true, "Ich glaube, dass ... yapısı buna örnektir."],
      dialogue: ["A: Der Tisch ist schon reserviert. B: ___", ["Gut, dass du angerufen hast!", "Dass gut du hast.", "Gut, du dass."], 0, "Gut, dass ... kalıbı olumlu tepki verir."],
      translation: ["Rezervasyon yaptığın iyi oldu.", ["Gut, dass du reserviert hast."], "dass + du + ... + hast"],
      tense: ["Ich glaube, dass der Service gut ___.", ["ist", "sein", "sind"], 0, "Tekil özne ve dass yan cümlesi: ist sonda."],
      plural: ["die Rechnung → ?", ["die Rechnungen", "Rechnungen"], "Çoğul Rechnungen'dir."],
      article: ["Trinkgeld", "das", "Doğru artikel das Trinkgeld'dir."],
      verb: ["du / reservieren / Perfekt", ["hast reserviert", "du hast reserviert"], "Perfekt: hast + reserviert."],
      paragraph: ["Bir restoran deneyimini dass ile 3 cümlede anlat.", "Ich finde, dass das Restaurant gemütlich ist. Gut, dass wir reserviert haben. Ich hoffe, dass das Essen bald kommt."],
      redemittel: ["Restoranda hesabı nazikçe iste.", "Entschuldigung, könnten wir bitte die Rechnung bekommen?"],
      summary: ["dass yan cümlesinde çekimli fiil nereye gider?", "Cümlenin sonuna", "Öznenin önüne", "Her zaman ilk sıraya", "dass yan cümlesinde fiil sona gider."]
    },
    {
      words: [["die Feier", "kutlama"], ["die Firma", "şirket"], ["der Kollege", "iş arkadaşı"], ["die Einladung", "davet"]],
      short: ["Worüber freust du dich?", ["Ich freue mich über die Einladung."], "freuen über mevcut bir şeyden sevinmektir."],
      visual: ["🎉🏢", "Kutlama için sevinç ve teşekkür ifade et.", "Ich freue mich sehr über die Feier. Ich bedanke mich bei meinen Kollegen für die Einladung."],
      reading: ["Seda erinnert sich gern an ihre erste Firma. Heute trifft sie alte Kollegen. Alle freuen sich über das Treffen.", "Worüber freuen sich die Kollegen?", ["Über das Treffen", "Über eine Prüfung", "Über das Wetter"], 0, "Metinde Treffen açıkça belirtiliyor."],
      correction: ["Ich freue mir auf die Feier.", ["Ich freue mich auf die Feier."], "sich freuen dönüşlüdür: ich freue mich."],
      tf: ["sich bedanken bei + kişi, für + şey ile kullanılır.", true, "Ich bedanke mich bei dir für die Hilfe."],
      dialogue: ["A: Herzlichen Glückwunsch! B: ___", ["Vielen Dank, das ist sehr nett.", "Ich erinnere dich.", "Auf Wiedersehen gestern."], 0, "Tebriğe doğal cevap teşekkürdür."],
      translation: ["Davet için sana teşekkür ediyorum.", ["Ich bedanke mich bei dir für die Einladung."], "bei dir + für die Einladung"],
      tense: ["Wir ___ uns auf das Fest.", ["freuen", "freut", "freue"], 0, "wir ile freuen, dönüşlü zamir uns."],
      plural: ["die Firma → ?", ["die Firmen", "Firmen"], "Çoğul Firmen'dir."],
      article: ["Einladung", "die", "Doğru artikel die Einladung'dur."],
      verb: ["er / sich erinnern / Präsens", ["erinnert sich", "er erinnert sich"], "er ile sich erinnern → erinnert sich."],
      paragraph: ["Bir kutlama ve duyguların hakkında 3 cümle yaz.", "Gestern war unsere Firmenfeier. Ich habe mich über die Musik gefreut. Am Ende habe ich mich bei der Chefin bedankt."],
      redemittel: ["Birini kutla ve karşılık ver.", "Herzlichen Glückwunsch! - Vielen Dank, ich freue mich sehr."],
      summary: ["Doğru dönüşlü yapı hangisidir?", "Ich freue mich auf die Feier.", "Ich freue mir auf die Feier.", "Ich freue dich auf die Feier.", "ich ile dönüşlü zamir mich olur."]
    },
    {
      words: [["der Salat", "salata"], ["die Ernährung", "beslenme"], ["die Zutat", "malzeme"], ["das Rezept", "tarif"]],
      short: ["Was isst du, wenn es warm ist?", ["Wenn es warm ist, esse ich Salat."], "wenn yan cümlesinde fiil sona gider."],
      visual: ["☀️🥗", "Görseli wenn ile iki cümlede anlat.", "Wenn es warm ist, esse ich gern Salat. Wenn ich Zeit habe, koche ich frisch."],
      reading: ["Wenn Deniz früh nach Hause kommt, kocht er frisch. Wenn er wenig Zeit hat, macht er einen Salat.", "Was macht Deniz bei wenig Zeit?", ["Einen Salat", "Eine Suppe", "Einen Kuchen"], 0, "Az vakti olduğunda salata yaptığı yazıyor."],
      correction: ["Wenn ich habe Zeit, koche ich frisch.", ["Wenn ich Zeit habe, koche ich frisch."], "wenn yan cümlesinde fiil sonda olur."],
      tf: ["wenn tekrarlanan veya koşula bağlı durumlarda kullanılabilir.", true, "Wenn ich Zeit habe ... koşul bildirir."],
      dialogue: ["A: Was kochst du, wenn Gäste kommen? B: ___", ["Dann mache ich eine Suppe.", "Wenn Gäste ist.", "Ich dann Gäste."], 0, "Ana cümlede Dann + fiil yapısı doğaldır."],
      translation: ["Hava sıcak olduğunda çoğunlukla salata yeriz.", ["Wenn es warm ist, essen wir meistens Salat.", "Wenn es warm ist, essen wir meist Salat."], "Wenn ... ist, essen wir ..."],
      tense: ["Wenn ich Zeit ___, koche ich frisch.", ["habe", "hat", "bin"], 0, "ich ile haben → habe ve yan cümlede sonda."],
      plural: ["die Zutat → ?", ["die Zutaten", "Zutaten"], "Çoğul Zutaten'dır."],
      article: ["Rezept", "das", "Doğru artikel das Rezept'tir."],
      verb: ["wir / essen / Präsens", ["essen", "wir essen"], "wir biçimi essen'dir."],
      paragraph: ["Farklı iki durumda ne yediğini 3 cümleyle anlat.", "Wenn ich wenig Zeit habe, esse ich ein Brot. Wenn Freunde kommen, koche ich Pasta. Am Wochenende probiere ich neue Rezepte."],
      redemittel: ["Yemek tercihini karşılaştır.", "Im Sommer esse ich lieber Salat, aber im Winter mag ich warme Suppen lieber."],
      summary: ["wenn yan cümlesinde doğru kelime dizilişi hangisidir?", "wenn ich Zeit habe", "wenn habe ich Zeit", "wenn ich habe Zeit", "Çekimli fiil yan cümlenin sonundadır."]
    },
    {
      words: [["die Lehrerin", "kadın öğretmen"], ["der Kurs", "kurs"], ["die Erfahrung", "deneyim"], ["die Sprache", "dil"]],
      short: ["Was hast du gemacht, als du 18 warst?", ["Als ich 18 war, lernte ich Deutsch."], "als geçmişte bir kez olan zamanı anlatır."],
      visual: ["👩‍🏫📚", "İlk Almanca dersini als ile anlat.", "Als ich meine erste Deutschstunde hatte, verstand ich wenig. Die Lehrerin sprach langsam."],
      reading: ["Als Lara ihre erste Deutschstunde hatte, verstand sie fast nichts. Ihre Lehrerin sprach langsam und half ihr viel.", "Wie half die Lehrerin?", ["Sie sprach langsam.", "Sie gab keinen Unterricht.", "Sie sprach nur Englisch."], 0, "Öğretmenin yavaş konuştuğu belirtiliyor."],
      correction: ["Wenn ich mein erstes Zertifikat bekam, war ich sehr glücklich.", ["Als ich mein erstes Zertifikat bekam, war ich sehr glücklich."], "Geçmişte bir kez olan olay için als kullanılır."],
      tf: ["als geçmişte bir kez gerçekleşen olaylarda kullanılır.", true, "Als ich 18 war ... buna örnektir."],
      dialogue: ["A: Wie war deine erste Deutschstunde? B: ___", ["Ich war sehr nervös.", "Als nervös ich.", "Ich bin morgen nervös war."], 0, "Geçmiş durum için war uygundur."],
      translation: ["İlk Almanca dersim olduğunda çok heyecanlıydım.", ["Als ich meine erste Deutschstunde hatte, war ich sehr aufgeregt."], "Als ... hatte, war ..."],
      tense: ["Als der Kurs ___, konnte Lara kurze Gespräche führen.", ["endete", "endet", "enden"], 0, "Geçmiş anlatımda endete kullanılır."],
      plural: ["der Kurs → ?", ["die Kurse", "Kurse"], "Çoğul Kurse'dir."],
      article: ["Erfahrung", "die", "Doğru artikel die Erfahrung'dur."],
      verb: ["ich / können / Präteritum", ["konnte", "ich konnte"], "können → konnte."],
      paragraph: ["İlk yabancı dil deneyimini 3 cümleyle anlat.", "Als ich meinen ersten Deutschkurs begann, war ich nervös. Die Lehrerin half mir viel. Nach dem Kurs konnte ich kurze Sätze sagen."],
      redemittel: ["Bir dil öğrenme deneyimine başla.", "Als ich zum ersten Mal Deutsch hörte, verstand ich fast nichts. Später wurde es leichter."],
      summary: ["Geçmişte bir kez olan olay için hangi bağlaç kullanılır?", "als", "wenn", "obwohl", "als tek ve geçmiş bir zaman noktasını anlatır."]
    },
    {
      words: [["das Päckchen", "küçük paket"], ["der Brief", "mektup"], ["die Adresse", "adres"], ["der Schalter", "gişe"]],
      short: ["Wann werden die Päckchen verschickt?", ["Sie werden am Nachmittag verschickt."], "Passiv: werden + Partizip II."],
      visual: ["📦✉️", "Paketin iki işlem aşamasını Passiv ile yaz.", "Zuerst wird das Päckchen gepackt. Danach wird die Adresse gedruckt."],
      reading: ["Morgens werden die Bestellungen geprüft. Danach werden die Produkte verpackt und die Adressen gedruckt.", "Was passiert nach der Prüfung?", ["Die Produkte werden verpackt.", "Die Pakete werden geöffnet.", "Die Adressen werden gelöscht."], 0, "Kontrolden sonra ürünler paketleniyor."],
      correction: ["Die Päckchen wird gepackt.", ["Die Päckchen werden gepackt."], "Çoğul özne ile werden kullanılır."],
      tf: ["Passiv Präsens, werden + Partizip II ile kurulur.", true, "Die Briefe werden sortiert."],
      dialogue: ["A: Was passiert mit dem Brief? B: ___", ["Er wird heute verschickt.", "Er verschickt wird heute er.", "Er werden schicken."], 0, "Tekil özne: wird + Partizip II."],
      translation: ["Paketler bugün gönderiliyor.", ["Die Pakete werden heute verschickt.", "Die Päckchen werden heute verschickt."], "çoğul + werden + verschickt"],
      tense: ["Die Adresse ___ gedruckt.", ["wird", "werden", "wurde sein"], 0, "Tekil Passiv Präsens: wird gedruckt."],
      plural: ["der Brief → ?", ["die Briefe", "Briefe"], "Çoğul Briefe'dir."],
      article: ["Adresse", "die", "Doğru artikel die Adresse'dir."],
      verb: ["die Pakete / werden / Präsens", ["werden", "die Pakete werden"], "Çoğul özne ile werden."],
      paragraph: ["Bir paketin gönderilme sürecini 3 adımda yaz.", "Zuerst wird das Paket gewogen. Dann wird die Adresse kontrolliert. Zum Schluss wird es verschickt."],
      redemittel: ["Postanede kibarca bilgi iste.", "Entschuldigung, können Sie mir sagen, wann das Päckchen verschickt wird?"],
      summary: ["Passiv Präsens'in doğru yapısı hangisidir?", "werden + Partizip II", "haben + Infinitiv", "sein + Präsens", "Passiv eylemi öne çıkarır: wird/werden + Partizip II."]
    },
    {
      words: [["der Fernseher", "televizyon"], ["die Nachricht", "haber / mesaj"], ["der Zuschauer", "izleyici"], ["die Sendung", "program / yayın"]],
      short: ["Wem zeigst du den Film?", ["Ich zeige meinem Freund den Film."], "Kişi Dativ, şey Akkusativ olur."],
      visual: ["📺📱", "Birine bir medya içeriği gönderdiğini yaz.", "Ich schicke meiner Schwester eine Nachricht. Danach zeige ich ihr den Film."],
      reading: ["Mira zeigt ihrem Bruder den neuen Film. Danach schickt sie ihrer Freundin eine Nachricht und empfiehlt ihr die Sendung.", "Wem empfiehlt Mira die Sendung?", ["Ihrer Freundin", "Ihrem Bruder", "Dem Zuschauer"], 0, "Sendung'u Freundin'e öneriyor."],
      correction: ["Ich zeige den Mann der Film.", ["Ich zeige dem Mann den Film."], "Kişi Dativ: dem Mann; şey Akkusativ: den Film."],
      tf: ["İki nesnede kişi çoğunlukla Dativ, şey Akkusativ olur.", true, "Ich gebe meinem Bruder das Buch."],
      dialogue: ["A: Kannst du mir den Link schicken? B: ___", ["Ja, ich schicke ihn dir sofort.", "Ja, ich schicke du ihn.", "Ja, mir schickst."], 0, "Zamirlerde Akkusativ çoğu zaman Dativden önce gelir: ihn dir."],
      translation: ["Arkadaşıma filmi gösteriyorum.", ["Ich zeige meinem Freund den Film.", "Ich zeige meiner Freundin den Film."], "kişi Dativ + şey Akkusativ"],
      tense: ["Sie empfiehlt ___ die Sendung.", ["ihm", "ihn", "er"], 0, "empfehlen Dativ kişi alır: ihm."],
      plural: ["die Nachricht → ?", ["die Nachrichten", "Nachrichten"], "Çoğul Nachrichten'dır."],
      article: ["Fernseher", "der", "Doğru artikel der Fernseher'dir."],
      verb: ["er / geben / Präsens", ["gibt", "er gibt"], "geben → er gibt."],
      paragraph: ["Medya alışkanlığını ve bir önerini 3 cümlede yaz.", "Abends sehe ich Nachrichten. Am Wochenende schaue ich eine Serie. Ich empfehle meinen Freunden oft gute Filme."],
      redemittel: ["Bir program öner ve gerekçe ver.", "Ich kann dir diese Sendung empfehlen, weil sie informativ und kurz ist."],
      summary: ["'Ich zeige meinem Freund den Film' cümlesinde kişi hangi hâldedir?", "Dativ", "Akkusativ", "Genitiv", "meinem Freund Dativ, den Film Akkusativtir."]
    },
    {
      words: [["das Hotelzimmer", "otel odası"], ["die Rezeption", "resepsiyon"], ["die Haltestelle", "durak"], ["der Tunnel", "tünel"]],
      short: ["Darf ich fragen, wo die Rezeption ist?", ["Die Rezeption ist neben dem Eingang."], "Dolaylı W-soruda fiil yan cümlenin sonundadır."],
      visual: ["🏨🗺️", "Bir otel görevlisine iki dolaylı soru yaz.", "Darf ich fragen, ob das Zimmer frei ist? Können Sie mir sagen, wo der Aufzug ist?"],
      reading: ["Ein Tourist fragt, ob der Bus zum Zentrum fährt. Die Mitarbeiterin erklärt, dass er durch den Tunnel fährt. Die Haltestelle liegt der Post gegenüber.", "Wo liegt die Haltestelle?", ["Der Post gegenüber", "Im Tunnel", "Vor dem Hotel"], 0, "Son cümlede konum açıkça veriliyor."],
      correction: ["Können Sie mir sagen, wo ist der Bahnhof?", ["Können Sie mir sagen, wo der Bahnhof ist?"], "Dolaylı soruda fiil sona gider."],
      tf: ["Evet/hayır dolaylı soruları ob ile bağlanır.", true, "Ich möchte wissen, ob ..."],
      dialogue: ["A: Darf ich fragen, ob noch ein Zimmer frei ist? B: ___", ["Ja, wir haben noch ein Einzelzimmer.", "Ob Zimmer ist frei?", "Durch die Zimmer."], 0, "Soruyu doğrudan ve doğal biçimde yanıtlar."],
      translation: ["Otobüsün merkeze gidip gitmediğini sorabilir miyim?", ["Darf ich fragen, ob der Bus ins Zentrum fährt?"], "ob + özne + ... + fiil"],
      tense: ["Ich möchte wissen, ob das Zimmer frei ___.", ["ist", "sein", "sind"], 0, "Dolaylı soruda ist sonda."],
      plural: ["das Hotelzimmer → ?", ["die Hotelzimmer", "Hotelzimmer"], "Çoğulda biçim değişmez."],
      article: ["Rezeption", "die", "Doğru artikel die Rezeption'dur."],
      verb: ["der Bus / fahren / Präsens", ["fährt", "der Bus fährt"], "fahren → er/es fährt."],
      paragraph: ["Otel rezervasyonu için 3 dolaylı soru yaz.", "Ich möchte wissen, ob Frühstück inklusive ist. Können Sie mir sagen, wo der Parkplatz ist? Darf ich fragen, wann das Zimmer frei ist?"],
      redemittel: ["Resepsiyonda nazikçe yol sor.", "Entschuldigung, können Sie mir bitte sagen, wie ich zum Bahnhof komme?"],
      summary: ["Evet/hayır türündeki dolaylı sorunun bağlacı hangisidir?", "ob", "weil", "als", "ob, 'olup olmadığını' anlamını verir."]
    },
    {
      words: [["der Bahnhof", "tren istasyonu"], ["die Reise", "seyahat"], ["das Meer", "deniz"], ["die Fahrkarte", "bilet"]],
      short: ["Wohin fahrt ihr im Sommer?", ["Wir fahren im Sommer nach Rumänien."], "Ülke ve şehirlerde çoğunlukla nach kullanılır."],
      visual: ["🚆🌊", "Başlangıç ve hedefi doğru edatlarla yaz.", "Wir fahren vom Bahnhof ans Meer. Danach reisen wir nach Italien."],
      reading: ["Im Juli fährt Familie Öz nach Italien. Zuerst reist sie zu Freunden nach Mailand, danach fährt sie ans Meer.", "Wohin fährt die Familie nach Mailand?", ["Ans Meer", "Zum Bahnhof", "In die Schweiz"], 0, "Mailand'dan sonra deniz kenarına gidiyorlar."],
      correction: ["Wir fahren im Sommer zu Rumänien.", ["Wir fahren im Sommer nach Rumänien."], "Artikelsiz ülke adıyla nach kullanılır."],
      tf: ["Şehir ve artikelsiz ülke adlarıyla yön için nach kullanılır.", true, "nach Berlin, nach Rumänien."],
      dialogue: ["A: Wie kommt ihr zum Bahnhof? B: ___", ["Wir fahren mit dem Bus.", "Wir fahren nach Bus.", "Wir sind den Bahnhof."], 0, "Araç için mit + Dativ kullanılır."],
      translation: ["Önce arkadaşlara, sonra deniz kenarına gidiyoruz.", ["Zuerst fahren wir zu Freunden, dann ans Meer."], "zu Freunden + ans Meer"],
      tense: ["Morgen fahren wir ___ Meer.", ["ans", "am", "nach dem"], 0, "Wohin? an das → ans Meer."],
      plural: ["die Fahrkarte → ?", ["die Fahrkarten", "Fahrkarten"], "Çoğul Fahrkarten'dır."],
      article: ["Bahnhof", "der", "Doğru artikel der Bahnhof'tur."],
      verb: ["wir / fahren / Präsens", ["fahren", "wir fahren"], "wir fahren."],
      paragraph: ["Bir seyahatin ulaşım planını 3 cümleyle yaz.", "Zuerst fahren wir mit dem Zug nach Berlin. Dort besuchen wir Freunde. Am nächsten Tag fahren wir ans Meer."],
      redemittel: ["Bir seyahat önerisi yap.", "Wir könnten im Sommer nach Rumänien fahren. Dort können wir Freunde besuchen."],
      summary: ["Artikelsiz ülke adına yön bildirirken hangi edat kullanılır?", "nach", "bei", "aus", "nach Rumänien doğru kullanımdır."]
    },
    {
      words: [["das Wetter", "hava"], ["die Sonne", "güneş"], ["die Wärme", "sıcaklık"], ["der Regen", "yağmur"]],
      short: ["Worauf freust du dich im Urlaub?", ["Ich freue mich auf die Sonne."], "sich freuen auf + Akkusativ."],
      visual: ["☀️🌧️", "İki hava durumunu edatlı fiille anlat.", "Ich freue mich auf die Sonne. Über den starken Regen ärgere ich mich."],
      reading: ["Jana freut sich auf ihren Urlaub. Sie interessiert sich für warme Länder und spricht oft darüber.", "Wofür interessiert sich Jana?", ["Für warme Länder", "Für Wintersport", "Für Kochkurse"], 0, "İlgilendiği alan warme Länder olarak veriliyor."],
      correction: ["Ich freue mich für die Sonne.", ["Ich freue mich auf die Sonne."], "Gelecekte beklenen şey için sich freuen auf kullanılır."],
      tf: ["Şeyler için worauf/darauf; kişiler için auf wen/auf ihn kullanılır.", true, "Pronominaladverbien çoğunlukla şeyleri gösterir."],
      dialogue: ["A: Worauf freust du dich? B: ___", ["Darauf, dass es warm wird.", "Auf ich freue.", "Worauf Sonne."], 0, "darauf, dass ... doğru bağlantıdır."],
      translation: ["Güneşi ve sıcaklığı dört gözle bekliyorum.", ["Ich freue mich auf Sonne und Wärme."], "sich freuen auf + Akkusativ"],
      tense: ["___ interessierst du dich? - Für das Klima.", ["Wofür", "Worauf", "Womit"], 0, "sich interessieren für → Wofür?"],
      plural: ["der Regen → ?", ["die Regen", "Regen"], "Regen genellikle sayılamaz; biçim aynı kalır."],
      article: ["Wetter", "das", "Doğru artikel das Wetter'dir."],
      verb: ["du / sich interessieren / Präsens", ["interessierst dich", "du interessierst dich"], "du interessierst dich für ..."],
      paragraph: ["Sevdiğin hava durumunu ve nedenini 3 cümleyle anlat.", "Ich freue mich auf warmes Wetter. Ich interessiere mich für Reisen in den Süden. Über langen Regen ärgere ich mich."],
      redemittel: ["Hava hakkında umut ifade et.", "Hoffentlich scheint morgen die Sonne. Ich freue mich schon auf die Wärme."],
      summary: ["sich interessieren fiili hangi edatla kullanılır?", "für", "auf", "von", "Doğru yapı sich interessieren für'dir."]
    },
    {
      words: [["das Theater", "tiyatro"], ["das Konzert", "konser"], ["das Museum", "müze"], ["die Eintrittskarte", "giriş bileti"]],
      short: ["Woher kommst du?", ["Ich komme gerade aus dem Theater."], "Kapalı mekânın içinden çıkış: aus + Dativ."],
      visual: ["🎭🎫", "Nereden geldiğini ve nereye gittiğini yaz.", "Ich komme aus dem Theater und gehe jetzt zum Konzert."],
      reading: ["Nach der Arbeit kommt Amir aus dem Büro. Er fährt zuerst zum Museum und danach ins Theater.", "Wohin fährt Amir zuerst?", ["Zum Museum", "Ins Theater", "Nach Hause"], 0, "İlk hedef Museum olarak veriliyor."],
      correction: ["Ich komme von dem Theater.", ["Ich komme aus dem Theater."], "Bir binanın içinden çıkış için aus kullanılır."],
      tf: ["Bir kişinin yanından gelirken von kullanılabilir.", true, "Ich komme vom Arzt."],
      dialogue: ["A: Wohin gehen wir heute? B: ___", ["Wir könnten ins Theater gehen.", "Wir kommen aus Theater gehen.", "Zum Theater sind."], 0, "Yön için in das → ins Theater."],
      translation: ["Müzeden geliyor ve konsere gidiyorum.", ["Ich komme aus dem Museum und gehe zum Konzert."], "aus dem Museum + zum Konzert"],
      tense: ["Wir gehen heute ___ Theater.", ["ins", "im", "aus dem"], 0, "Wohin? in das → ins."],
      plural: ["das Museum → ?", ["die Museen", "Museen"], "Museum kelimesinin çoğulu Museen'dir."],
      article: ["Eintrittskarte", "die", "Doğru artikel die Eintrittskarte'dir."],
      verb: ["ich / kommen / Präsens", ["komme", "ich komme"], "ich komme."],
      paragraph: ["Bir kültür akşamının rotasını 3 cümleyle yaz.", "Zuerst gehen wir ins Museum. Danach fahren wir zum Theater. Spät am Abend kommen wir vom Konzert nach Hause."],
      redemittel: ["Bir etkinliğe ikna edici davet yap.", "Komm doch mit ins Theater! Das Stück soll sehr lustig sein."],
      summary: ["Bir binanın içinden gelirken hangi edat kullanılır?", "aus", "zu", "nach", "aus dem Museum / aus dem Theater denir."]
    },
    {
      words: [["der Comic", "çizgi roman"], ["die Zeitung", "gazete"], ["der Roman", "roman"], ["der Artikel", "makale"]],
      short: ["Was durftest du als Kind lesen?", ["Ich durfte Comics lesen."], "Modal fiil Präteritumda 2. yerde, ana fiil sonda."],
      visual: ["📚📰", "Çocukken okuyabildiğin ve okuyamadığın şeyleri yaz.", "Als Kind durfte ich Comics lesen, aber ich konnte keine langen Romane verstehen."],
      reading: ["Als Kind musste Leo jeden Tag lesen. Er durfte Comics wählen, aber er konnte lange Artikel noch nicht verstehen.", "Was durfte Leo wählen?", ["Comics", "Nur Zeitungen", "Keine Bücher"], 0, "Metinde Comics seçebildiği yazıyor."],
      correction: ["Ich durfte keine Comics gelesen.", ["Ich durfte keine Comics lesen."], "Modal fiilden sonra mastar sonda kalır."],
      tf: ["Modal fiillerin Präteritum biçimlerinde umlaut çoğunlukla kaybolur.", true, "dürfen → durfte, können → konnte."],
      dialogue: ["A: Musstest du als Kind viel lesen? B: ___", ["Ja, ich musste jeden Abend lesen.", "Ja, ich müssen las.", "Ja, ich durfte musste."], 0, "musste + mastar doğru yapıdır."],
      translation: ["Çocukken çizgi roman okuyamazdım.", ["Als Kind durfte ich keine Comics lesen.", "Als Kind konnte ich keine Comics lesen."], "Modal Präteritum + mastar"],
      tense: ["Früher ___ ich jeden Tag die Zeitung lesen.", ["musste", "muss", "gemusst"], 0, "Geçmişte zorunluluk: musste."],
      plural: ["der Roman → ?", ["die Romane", "Romane"], "Çoğul Romane'dir."],
      article: ["Zeitung", "die", "Doğru artikel die Zeitung'dur."],
      verb: ["wir / können / Präteritum", ["konnten", "wir konnten"], "wir konnten."],
      paragraph: ["Çocukken okuma alışkanlığını 3 cümleyle anlat.", "Als Kind durfte ich viele Comics lesen. Für die Schule musste ich auch Romane lesen. Lange Artikel konnte ich nicht gut verstehen."],
      redemittel: ["İlgi veya ilgisizlik ifade et.", "Romane interessieren mich sehr, aber Comics interessieren mich eigentlich nicht."],
      summary: ["Modal Präteritumdan sonra ana fiil hangi biçimde gelir?", "Mastar olarak cümlenin sonunda", "Partizip II olarak başta", "Çekimli olarak ortada", "Ich durfte Comics lesen: lesen mastar ve sonda."]
    },
    {
      words: [["die Behörde", "resmî kurum"], ["das Formular", "form"], ["der Pass", "pasaport"], ["der Antrag", "başvuru"]],
      short: ["Welches Formular brauchst du?", ["Ich brauche das, das auf dem Tisch liegt."], "welch- soru artikeli; das zamiri ismin yerini tutar."],
      visual: ["🏛️📄", "Görevliye hangi belgeyi kastettiğini açıkla.", "Ich meine das Formular dort. Können Sie das bitte kopieren lassen?"],
      reading: ["Im Amt zeigt die Mitarbeiterin drei Formulare. Cem fragt: Welches brauche ich? Er nimmt dieses und lässt seinen Pass kopieren.", "Was lässt Cem kopieren?", ["Seinen Pass", "Das Gebäude", "Die Eintrittskarte"], 0, "Kopyalattığı belge Pass olarak belirtiliyor."],
      correction: ["Welche Pass meinst du?", ["Welchen Pass meinst du?"], "Pass eril Akkusativ: welchen."],
      tf: ["lassen + mastar, bir işi yaptırmayı anlatabilir.", true, "Ich lasse den Pass kopieren."],
      dialogue: ["A: Welchen Antrag meinen Sie? B: ___", ["Den auf dem Tisch.", "Der auf dem Tisch.", "Welche den Tisch."], 0, "Eril Akkusativ zamiri den kullanılır."],
      translation: ["Pasaportumu kopyalatıyorum.", ["Ich lasse meinen Pass kopieren."], "lassen + Akkusativ + mastar"],
      tense: ["___ Formular muss ich ausfüllen?", ["Welches", "Welchen", "Welche"], 0, "Formular nötrdür: welches."],
      plural: ["der Antrag → ?", ["die Anträge", "Anträge"], "Çoğulda a → ä: Anträge."],
      article: ["Formular", "das", "Doğru artikel das Formular'dır."],
      verb: ["er / lassen / Präsens", ["lässt", "er lässt"], "lassen → er lässt."],
      paragraph: ["Bir resmî kurumda yaptığın üç işlemi anlat.", "Zuerst fülle ich dieses Formular aus. Dann lasse ich meinen Pass kopieren. Danach gebe ich den Antrag am Schalter ab."],
      redemittel: ["Bir açıklamayı netleştirmesini iste.", "Entschuldigung, welchen Antrag meinen Sie genau? Den hier?"],
      summary: ["Bir işi başkasına yaptırmak için hangi yapı kullanılır?", "lassen + mastar", "sein + zu", "haben + Partizip", "Ich lasse den Pass kopieren doğru örnektir."]
    },
    {
      words: [["der Verkehr", "trafik / ulaşım"], ["der Wagen", "otomobil"], ["die Monatskarte", "aylık bilet"], ["das Fahrrad", "bisiklet"]],
      short: ["Seit wann fährst du mit dem Fahrrad?", ["Seit ich mein Auto verkauft habe, fahre ich Rad."], "seit yan cümlesinde fiil sona gider."],
      visual: ["🚲🚌", "Başlangıçtan bugüne ve bir bitiş noktasına kadar ulaşımı anlat.", "Seit ich mein Auto verkauft habe, fahre ich Rad. Bis die Monatskarte kommt, nehme ich manchmal den Bus."],
      reading: ["Seit Eda ihr Auto verkauft hat, fährt sie mit dem Rad. Bei Regen nimmt sie den Bus. Bis ihre Monatskarte kommt, kauft sie Einzeltickets.", "Was macht Eda bei Regen?", ["Sie nimmt den Bus.", "Sie fährt immer Rad.", "Sie bleibt zu Hause."], 0, "Yağmurda otobüse bindiği yazıyor."],
      correction: ["Seit ich habe mein Auto verkauft, fahre ich Rad.", ["Seit ich mein Auto verkauft habe, fahre ich Rad."], "seit yan cümlesinde yardımcı fiil sonda olur."],
      tf: ["bis bir bitiş noktasına kadar olan süreyi gösterir.", true, "Bis der Bus kommt, warte ich hier."],
      dialogue: ["A: Was machst du, bis der Bus kommt? B: ___", ["Ich warte an der Haltestelle.", "Seit der Bus kommt.", "Ich bis warten."], 0, "bis sorusuna bekleme eylemi doğal yanıttır."],
      translation: ["Otobüs gelene kadar burada bekliyorum.", ["Ich warte hier, bis der Bus kommt."], "bis + özne + ... + fiil"],
      tense: ["Seit ich den Wagen verkauft ___, fahre ich Rad.", ["habe", "bin", "hat"], 0, "verkaufen Perfekt: habe verkauft; fiil sonda."],
      plural: ["der Wagen → ?", ["die Wagen", "Wagen"], "Çoğulda biçim değişmez."],
      article: ["Monatskarte", "die", "Doğru artikel die Monatskarte'dir."],
      verb: ["sie / fahren / Präsens", ["fährt", "sie fährt"], "fahren → sie fährt."],
      paragraph: ["Ulaşım alışkanlığındaki bir değişimi 3 cümleyle anlat.", "Seit ich näher am Büro wohne, fahre ich mit dem Fahrrad. Bei Regen nehme ich den Bus. Bis zum Winter möchte ich eine Monatskarte kaufen."],
      redemittel: ["Bilet alma sürecini kısa anlat.", "Zuerst wähle ich die Verbindung. Dann bezahle ich online. Zum Schluss speichere ich die Fahrkarte."],
      summary: ["Başlangıçtan bugüne süren zamanı hangi bağlaç gösterir?", "seit / seitdem", "bis", "als", "seit başlangıcı, bis bitiş noktasını gösterir."]
    },
    {
      words: [["der Beruf", "meslek"], ["die Ausbildung", "mesleki eğitim"], ["die Stelle", "iş pozisyonu"], ["die Bewerbung", "iş başvurusu"]],
      short: ["Was für einen Beruf suchst du?", ["Ich suche einen Beruf, der kreativ ist."], "Relativ zamir, önceki ismin cinsine göre seçilir."],
      visual: ["💼🎓", "İstediğin işi iki Relativsatz ile anlat.", "Ich suche eine Stelle, die interessant ist. Ich möchte einen Beruf, der zu mir passt."],
      reading: ["Mina sucht einen Beruf, der kreativ ist. Sie spricht mit einer Beraterin, die viele Firmen kennt. Die Stelle, die Mina interessant findet, ist in einer Agentur.", "Welche Stelle findet Mina interessant?", ["Die Stelle in einer Agentur", "Eine Stelle im Krankenhaus", "Eine Stelle im Hotel"], 0, "İlginç bulduğu iş ajansta."],
      correction: ["Das ist der Beruf, den zu mir passt.", ["Das ist der Beruf, der zu mir passt."], "Relativ cümlede özne olduğu için der kullanılır."],
      tf: ["Relativ cümlede çekimli fiil sona gider.", true, "die mir gefällt örneğinde gefällt sonda."],
      dialogue: ["A: Welche Stelle suchst du? B: ___", ["Eine Stelle, die flexible Arbeitszeiten bietet.", "Eine Stelle, der bietet Zeit.", "Die Stelle, den ich."], 0, "die Stelle → die; Relativsatzta fiil sonda."],
      translation: ["Bana uygun olan bir meslek arıyorum.", ["Ich suche einen Beruf, der zu mir passt."], "der Beruf → der; fiil sonda"],
      tense: ["Das ist das Buch, ___ ich brauche.", ["das", "der", "den"], 0, "das Buch, Akkusativ Relativpronomen yine das."],
      plural: ["der Beruf → ?", ["die Berufe", "Berufe"], "Çoğul Berufe'dir."],
      article: ["Bewerbung", "die", "Doğru artikel die Bewerbung'dur."],
      verb: ["die Stelle / passen / Präsens", ["passt", "die Stelle passt"], "3. tekil kişi passt."],
      paragraph: ["Sana uygun işi 3 cümle ve en az bir Relativsatz ile anlat.", "Ich suche eine Stelle, die kreativ ist. Nette Kollegen sind mir wichtig. Ich möchte einen Beruf, der zu meinen Interessen passt."],
      redemittel: ["İş memnuniyeti veya memnuniyetsizliği ifade et.", "Mit den Aufgaben bin ich zufrieden, aber die Arbeitszeiten gefallen mir nicht."],
      summary: ["Relativ zamirin hâlini ne belirler?", "Relativ cümledeki görevi", "Yalnız önceki ismin çoğulu", "Cümlenin uzunluğu", "Cins önceki isimden, hâl Relativsatz içindeki görevden gelir."]
    },
    {
      words: [["der Alltag", "günlük yaşam"], ["das Ausland", "yurt dışı"], ["der Kollege", "iş arkadaşı"], ["die Erfahrung", "deneyim"]],
      short: ["Wie sah dein Alltag damals aus?", ["Mein Alltag sah damals ganz anders aus."], "sehen Präteritum: sah."],
      visual: ["🌍💼", "Yurt dışındaki geçmiş bir iş gününü iki cümleyle anlat.", "Ich arbeitete ein Jahr in Wien. Jeden Morgen fuhr ich mit der U-Bahn zur Arbeit."],
      reading: ["Vor fünf Jahren lebte Jonas in Wien. Er stand jeden Tag um sechs auf, fuhr mit der U-Bahn zur Arbeit und lernte abends Deutsch.", "Was machte Jonas abends?", ["Er lernte Deutsch.", "Er fuhr nach Hamburg.", "Er arbeitete weiter."], 0, "Akşamları Almanca öğrendiği belirtiliyor."],
      correction: ["Letztes Jahr arbeite ich in Zürich.", ["Letztes Jahr arbeitete ich in Zürich."], "Geçmiş hikâyede düzenli Präteritum: arbeitete."],
      tf: ["Düzenli fiiller Präteritumda çoğunlukla -te alır.", true, "arbeiten → arbeitete."],
      dialogue: ["A: Wie war dein Alltag in Wien? B: ___", ["Ich arbeitete viel, aber ich lernte auch Deutsch.", "Ich arbeite gestern morgen.", "Ich war arbeiten werde."], 0, "Geçmiş anlatı için arbeitete/lernte uygundur."],
      translation: ["Bir yıl Viyana'da çalıştım.", ["Ich arbeitete ein Jahr in Wien."], "arbeiten → arbeitete"],
      tense: ["Danach ___ ich nach Hause.", ["fuhr", "fahre", "gefahrt"], 0, "fahren Präteritum: fuhr."],
      plural: ["der Kollege → ?", ["die Kollegen", "Kollegen"], "N-deklination çoğulu Kollegen'dir."],
      article: ["Ausland", "das", "Doğru artikel das Ausland'dır."],
      verb: ["wir / anfangen / Präteritum", ["fingen an", "wir fingen an"], "anfangen → wir fingen ... an."],
      paragraph: ["Beş yıl önceki günlük yaşamını 3 cümleyle anlat.", "Vor fünf Jahren wohnte ich in Ankara. Ich fuhr jeden Tag früh zur Arbeit. Abends traf ich oft Freunde."],
      redemittel: ["Yurt dışı deneyiminde heyecan veya hayal kırıklığı ifade et.", "Am Anfang war ich begeistert, aber die langen Arbeitszeiten enttäuschten mich."],
      summary: ["Düzensiz Präteritum örneği hangisidir?", "fahren → fuhr", "arbeiten → gearbeitet", "lernen → lernt", "fahren fiilinin Präteritum kökü fuhr'dur."]
    }
  ];

  function mixedChoice(correct, distractors, shift) {
    const values = [correct, ...distractors].filter((value, index, list) => list.indexOf(value) === index).slice(0, 3);
    while (values.length < 3) values.push("—");
    const move = Math.abs(shift) % values.length;
    const options = values.slice(move).concat(values.slice(0, move));
    return { options, answer: options.indexOf(correct) };
  }

  function choice(id, kind, prompt, options, answer, explanation, extra) {
    return { id, type: "choice", kind, prompt, options, answer, explanation, ...(extra || {}) };
  }

  function text(id, kind, prompt, answers, explanation, extra) {
    return { id, type: "text", kind, prompt, answers, explanation, ...(extra || {}) };
  }

  function self(id, kind, prompt, model, extra) {
    return { id, type: "self", kind, prompt, model, explanation: "Cevabını örnekle karşılaştır. Aynı kelimeleri kullanmak zorunda değilsin; anlam ve yapı doğru olmalı.", ...(extra || {}) };
  }

  function buildExercises(unit, pack) {
    const wordA = mixedChoice(pack.words[0][0], [pack.words[1][0], pack.words[2][0]], unit.id);
    const wordB = mixedChoice(pack.words[1][0], [pack.words[0][0], pack.words[3][0]], unit.id + 1);
    const articleOptions = ["der", "die", "das"];
    const reading = pack.reading;
    const dialogue = pack.dialogue;
    const tense = pack.tense;
    const summary = mixedChoice(pack.summary[1], [pack.summary[2], pack.summary[3]], unit.id + 2);
    const exampleTokens = unit.examples[0].split(/\s+/);
    const rotatedTokens = exampleTokens.slice(2).concat(exampleTokens.slice(0, 2));
    const tableAnswer = pack.words[2][0];
    const tableBare = tableAnswer.replace(/^(der|die|das)\s+/i, "");
    const wordAnswer = pack.words[3][0];
    const wordBare = wordAnswer.replace(/^(der|die|das)\s+/i, "");

    return [
      choice("q01", "Konu eşleştirme / Thema zuordnen", `“${pack.words[0][1]}” anlamına gelen Almanca kelimeyi seç.`, wordA.options, wordA.answer, `Doğru eşleştirme: ${pack.words[0][0]} = ${pack.words[0][1]}.`),
      text("q02", "Boşluk doldurma / Lückentext ergänzen", `${unit.fills[0].before} ___ ${unit.fills[0].after}`.replace(/\s+/g, " ").trim(), unit.fills[0].answers, unit.fills[0].hint),
      choice("q03", "Doğru seçme / Das Richtige wählen", unit.choices[0].q, unit.choices[0].options, unit.choices[0].answer, unit.choices[0].explain),
      { id: "q04", type: "order", kind: "Cümle kurma / Sätze bilden", prompt: "Kelimelere doğru sırayla dokun.", tokens: unit.order.tokens, answerText: unit.order.answer, explanation: unit.order.hint },
      { id: "q05", type: "order", kind: "Sıralama / Reihenfolge", prompt: "Örnek cümleyi doğru sıraya getir.", tokens: rotatedTokens, answerText: unit.examples[0], explanation: "Çekimli fiilin yeri ve noktalama işaretine dikkat et." },
      choice("q06", "Eşleştirme / Zuordnungsübung", `“${pack.words[1][1]}” hangi Almanca kelimedir?`, wordB.options, wordB.answer, `Doğru cevap: ${pack.words[1][0]}.`),
      text("q07", "Kısa cevap / Kurzantwort", pack.short[0], pack.short[1], pack.short[2], { placeholder: "Kısa Almanca cevap yaz" }),
      text("q08", "Kelime yerleştirme / Wörter einsetzen", `${unit.fills[1].before} ___ ${unit.fills[1].after}`.replace(/\s+/g, " ").trim(), unit.fills[1].answers, unit.fills[1].hint),
      text("q09", "Tablo doldurma / Tabelle ausfüllen", `Tablodaki eksik Almanca kelimeyi yaz: ${pack.words[2][1]} → ?`, [tableAnswer, tableBare], `Doğru eşleştirme ${tableAnswer} = ${pack.words[2][1]}.`, { table: [["Türkçe", pack.words[2][1]], ["Almanca", "?"]] }),
      self("q10", "Görsele göre yazma / Nach dem Bild schreiben", pack.visual[1], pack.visual[2], { visual: pack.visual[0] }),
      choice("q11", "Soru-cevap / Frage und Antwort", unit.choices[2].q, unit.choices[2].options, unit.choices[2].answer, unit.choices[2].explain),
      choice("q12", "Metin tamamlama / Text vervollständigen", reading[1], reading[2], reading[3], reading[4], { context: reading[0] }),
      text("q13", "Hatalı cümleyi düzeltme / Satz korrigieren", `Hatalı cümleyi düzelt: ${pack.correction[0]}`, pack.correction[1], pack.correction[2]),
      choice("q14", "Doğru-yanlış / Richtig oder falsch", pack.tf[0], ["Doğru", "Yanlış"], pack.tf[1] ? 0 : 1, pack.tf[2]),
      choice("q15", "Diyalog tamamlama / Dialog ergänzen", dialogue[0], dialogue[1], dialogue[2], dialogue[3]),
      text("q16", "Çeviri / Übersetzungsübung", `Almancaya çevir: “${pack.translation[0]}”`, pack.translation[1], pack.translation[2], { placeholder: "Almanca cümleni yaz" }),
      choice("q17", "Doğru biçimi seçme / Die richtige Form", tense[0], tense[1], tense[2], tense[3]),
      text("q18", "Çoğul yapma / Plural bilden", pack.plural[0], pack.plural[1], pack.plural[2], { placeholder: "Çoğul biçimi yaz" }),
      choice("q19", "Artikeli bulma / Artikel bestimmen", `___ ${pack.article[0]}`, articleOptions, articleOptions.indexOf(pack.article[1]), pack.article[2]),
      text("q20", "Fiil çekimi / Verb konjugieren", pack.verb[0], pack.verb[1], pack.verb[2], { placeholder: "Çekimli fiili yaz" }),
      text("q21", "Kelime yazma / Wörter schreiben", `“${pack.words[3][1]}” kelimesini Almanca yaz.`, [wordAnswer, wordBare], `Doğru cevap: ${wordAnswer}.`, { placeholder: "Almanca kelime" }),
      self("q22", "Mini paragraf / Kurzer Text", pack.paragraph[0], pack.paragraph[1]),
      self("q23", "Konuşma kalıbı / Redemittel", pack.redemittel[0], pack.redemittel[1]),
      choice("q24", "Ünite özeti / Einheitenzusammenfassung", pack.summary[0], summary.options, summary.answer, pack.summary[4])
    ];
  }

  if (units.length !== 24 || packs.length !== 24) {
    console.error("AYDA A2: 24 ünite veya alıştırma paketi eksik.");
    return;
  }

  units.forEach((unit, index) => {
    unit.exercises = buildExercises(unit, packs[index]);
  });
})();
