import { test, expect } from '@playwright/test';

test.describe('kontakt', () => {
test('kontakt-001: Kontakta oss-sidan visas', async ({ page }) => {
  // Requirement: Sidan ska tydligt visa att användaren befinner sig på Kontakta oss.
  // Observable outcome: Texten \'Kontakta oss\' är synlig på sidan.
  // Acceptance criteria:
  // - När sidan öppnas på desktop visas texten \'Kontakta oss\'.
  await page.goto('https://www.vasscompany.se/kontakt/');
  await expect(page.url()).toContain('/kontakt');
  await expect(page.locator('body')).toContainText(/Kontakta\s*oss/i);
});

test('kontakt-002: Introduktionstext visas', async ({ page }) => {
  // Requirement: Sidan ska visa den inledande beskrivningen om produkter, tjänster och att jobba hos företaget.
  // Observable outcome: Introduktionstexterna är synliga.
  // Acceptance criteria:
  // - Texten \'Vill du veta mer om våra produkter & tjänster eller hur det är att jobba hos oss?\' visas.
  // - Texten \'Kontakta oss så berättar vi mer.\' visas.
  await page.goto('https://www.vasscompany.se/kontakt/');
  await expect(page.locator('body')).toContainText(/Vill\s*du\s*veta\s*mer\s*om\s*våra\s*produkter\s*&\s*tjänster\s*eller\s*hur\s*det\s*är\s*att\s*jobba\s*hos\s*oss\?/i);
  await expect(page.locator('body')).toContainText(/Kontakta\s*oss\s*så\s*berättar\s*vi\s*mer\./i);
});

test('kontakt-003: Kontaktområden visas', async ({ page }) => {
  // Requirement: Sidan ska visa val för tjänster/produkter och karriärmöjligheter.
  // Observable outcome: Alternativen \'Tjänster & Produkter\' och \'Karriärmöjligheter\' är synliga.
  // Acceptance criteria:
  // - Texten \'Tjänster & Produkter\' visas.
  // - Texten \'Karriärmöjligheter\' visas.
  await page.goto('https://www.vasscompany.se/kontakt/');
  await expect(page.locator('body')).toContainText(/Tjänster\s*&\s*Produkter/i);
  await expect(page.locator('body')).toContainText(/Karriärmöjligheter/i);
});

test('kontakt-004: Kontaktformulärets fältetiketter visas', async ({ page }) => {
  // Requirement: Kontaktformuläret för tjänster och produkter ska visa samtliga synliga fältetiketter enligt innehållet.
  // Observable outcome: Formulärtexter och fältetiketter är synliga.
  // Acceptance criteria:
  // - Texten \'Vill du veta mer om våra produkter & tjänster?\' visas.
  // - Texten \'Fyll i formuläret så återkommer vi till dig inom kort!\' visas.
  // - Fältetiketten \'Förnamn\' visas.
  // - Fältetiketten \'Efternamn\' visas.
  // - Fältetiketten \'E-post\' visas.
  // - Fältetiketten \'Telefon (Valfri)\' visas.
  // - Fältetiketten \'Företag (Valfri)\' visas.
  // - Fältetiketten \'Meddelande (Valfri)\' visas.
  await page.goto('https://www.vasscompany.se/kontakt/');
  await expect(page.locator('body')).toContainText(/Vill\s*du\s*veta\s*mer\s*om\s*våra\s*produkter\s*&\s*tjänster\?/i);
  await expect(page.locator('body')).toContainText(/Fyll\s*i\s*formuläret\s*så\s*återkommer\s*vi\s*till\s*dig\s*inom\s*kort!/i);
  await expect(page.locator('body')).toContainText(/Förnamn/i);
  await expect(page.locator('body')).toContainText(/Efternamn/i);
  await expect(page.locator('body')).toContainText(/E-post/i);
  await expect(page.locator('body')).toContainText(/Telefon\s*\(Valfri\)/i);
  await expect(page.locator('body')).toContainText(/Företag\s*\(Valfri\)/i);
  await expect(page.locator('body')).toContainText(/Meddelande\s*\(Valfri\)/i);
});

test('kontakt-005: Samtyckestexter i kontaktformulär visas', async ({ page }) => {
  // Requirement: Kontaktformuläret ska visa samtyckestext för personuppgifter och marknadsföringsutskick.
  // Observable outcome: Båda samtyckestexterna är synliga.
  // Acceptance criteria:
  // - Texten \'Jag samtycker till att VASS behandlar mina personuppgifter.\' visas.
  // - Texten \'Jag samtycker till att VASS kan skicka e-post i marknadsföringssyfte\' visas.
  await page.goto('https://www.vasscompany.se/kontakt/');
  await expect(page.locator('body')).toContainText(/Jag\s*samtycker\s*till\s*att\s*VASS\s*behandlar\s*mina\s*personuppgifter\./i);
  await expect(page.locator('body')).toContainText(/Jag\s*samtycker\s*till\s*att\s*VASS\s*kan\s*skicka\s*e-post\s*i\s*marknadsföringssyfte/i);
});

test('kontakt-006: Karriärinformation visas', async ({ page }) => {
  // Requirement: Sidan ska visa information om att lediga tjänster hanteras separat och att jobbansökningar inte behandlas i formuläret.
  // Observable outcome: Karriärrelaterade informationsmeddelanden är synliga.
  // Acceptance criteria:
  // - Texten \'Se hit om du efter våra lediga tjänster.\' visas.
  // - Texten \'Vi behandlar inte jobbansökningar i detta formulär.\' visas.
  await page.goto('https://www.vasscompany.se/kontakt/');
  await expect(page.locator('body')).toContainText(/Se\s*hit\s*om\s*du\s*efter\s*våra\s*lediga\s*tjänster\./i);
  await expect(page.locator('body')).toContainText(/Vi\s*behandlar\s*inte\s*jobbansökningar\s*i\s*detta\s*formulär\./i);
});

test('kontakt-007: Stockholmskontorets information visas', async ({ page }) => {
  // Requirement: Sidan ska visa sektionen för att hitta till kontoret i Stockholm med adress och telefonnummer.
  // Observable outcome: Rubrik, beskrivning, adress och telefon för Stockholm är synliga.
  // Acceptance criteria:
  // - Texten \'Hitta till oss i Stockholm\' visas.
  // - Texten \'Det är i Stockholm vi har vårt huvudkontor.\' visas.
  // - Texten \'Birger Jarlsgatan 9\' visas.
  // - Texten \'111 45 Stockholm\' visas.
  // - Texten \'+46(0)8-406 68 00\' visas.
  await page.goto('https://www.vasscompany.se/kontakt/');
  await expect(page.locator('body')).toContainText(/Hitta\s*till\s*oss\s*i\s*Stockholm/i);
  await expect(page.locator('body')).toContainText(/Det\s*är\s*i\s*Stockholm\s*vi\s*har\s*vårt\s*huvudkontor\./i);
  await expect(page.locator('body')).toContainText(/Birger\s*Jarlsgatan\s*9/i);
  await expect(page.locator('body')).toContainText(/111\s*45\s*Stockholm/i);
  await expect(page.locator('body')).toContainText(/\+46\(0\)8-406\s*68\s*00/i);
});

test('kontakt-008: Kontaktpersoner visas', async ({ page }) => {
  // Requirement: Sidan ska visa kontaktpersoner för försäljning och karriär.
  // Observable outcome: Rubriken Kontaktpersoner samt namn, roller och karriärmail är synliga.
  // Acceptance criteria:
  // - Texten \'Kontaktpersoner\' visas.
  // - Texten \'Försäljning\' visas.
  // - Texten \'Anders Söderman\' visas.
  // - Texten \'Försäljningsansvarig\' visas.
  // - Texten \'Karriär\' visas.
  // - Texten \'Sofie Gillberg\' visas.
  // - Texten \'Rekryteringsansvarig\' visas.
  // - Texten \'rekrytering@vasscompany.com\' visas.
  await page.goto('https://www.vasscompany.se/kontakt/');
  await expect(page.locator('body')).toContainText(/Kontaktpersoner/i);
  await expect(page.locator('body')).toContainText(/Försäljning/i);
  await expect(page.locator('body')).toContainText(/Anders\s*Söderman/i);
  await expect(page.locator('body')).toContainText(/Försäljningsansvarig/i);
  await expect(page.locator('body')).toContainText(/Karriär/i);
  await expect(page.locator('body')).toContainText(/Sofie\s*Gillberg/i);
  await expect(page.locator('body')).toContainText(/Rekryteringsansvarig/i);
  await expect(page.locator('body')).toContainText(/rekrytering@vasscompany\.com/i);
});

test('kontakt-009: Nyhetsbrev finns', async ({ page }) => {
  // Requirement: Sidan ska innehålla en synlig nyhetsbrevssektion med e-postfält, prenumerationsknapp, samtyckestext och tackmeddelande som förekomstskontroller.
  // Observable outcome: Nyhetsbrevets innehåll och relaterade texter är synliga.
  // Acceptance criteria:
  // - Texten \'Signa upp dig på vårt nyhetsbrev och ta del av eventinbjudningar, nyheter och insikter om den senaste tekniken och trenderna på marknaden.\' visas.
  // - Texten \'E-postadress\' visas.
  // - Texten \'Prenumerera\' visas.
  // - Texten \'Jag samtycker till att VASS behandlar mina personuppgifter .\' visas.
  // - Texten \'Tack & kul att du vill prenumerera på vårt nyhetsbrev!\' kan verifieras som synlig förekomst om den visas på sidan.
  await page.goto('https://www.vasscompany.se/kontakt/');
  await expect(page.locator('body')).toContainText(/Signa\s*upp\s*dig\s*på\s*vårt\s*nyhetsbrev\s*och\s*ta\s*del\s*av\s*eventinbjudningar,\s*nyheter\s*och\s*insikter\s*om\s*den\s*senaste\s*tekniken\s*och\s*trenderna\s*på\s*marknaden\./i);
  await expect(page.locator('body')).toContainText(/E-postadress/i);
  await expect(page.locator('body')).toContainText(/Prenumerera/i);
  await expect(page.locator('body')).toContainText(/Jag\s*samtycker\s*till\s*att\s*VASS\s*behandlar\s*mina\s*personuppgifter\s*\./i);
  await expect(page.locator('body')).toContainText(/Tack\s*&\s*kul\s*att\s*du\s*vill\s*prenumerera\s*på\s*vårt\s*nyhetsbrev!/i);
});

test('kontakt-010: Sidfotens kontaktuppgifter och länknamn visas', async ({ page }) => {
  // Requirement: Sidan ska i synligt sidfotsinnehåll visa kontaktuppgifter, navigationslänknamn och policytexter.
  // Observable outcome: Sidfotens adress, telefon, e-post, länknamn och policytexter är synliga.
  // Acceptance criteria:
  // - Texten \'Birger Jarlsgatan 9\' visas.
  // - Texten \'Stockholm\' visas.
  // - Texten \'+46 8-406 68 00\' visas.
  // - Texten \'info.se@vasscompany.com\' visas.
  // - Texten \'Erbjudanden\' visas.
  // - Texten \'Våra kunder\' visas.
  // - Texten \'Karriär\' visas.
  // - Texten \'Kurser & Event\' visas.
  // - Texten \'Insikter\' visas.
  // - Texten \'Om oss\' visas.
  // - Texten \'Kontakta oss\' visas.
  // - Texten \'© 2026 VASS Sweden AB All rights reserved\' visas.
  // - Texten \'Cookies & Integrity Policy\' visas.
  // - Texten \'Whistleblower Policy\' visas.
  await page.goto('https://www.vasscompany.se/kontakt/');
  await expect(page.locator('body')).toContainText(/Birger\s*Jarlsgatan\s*9|Stockholm|\+46\s*8-406\s*68\s*00|info\.se@vasscompany\.com|Erbjudanden|Våra\s*kunder|Karriär|Kurser\s*&\s*Event|Insikter|Om\s*oss|Kontakta\s*oss|©\s*2026\s*VASS\s*Sweden\s*AB\s*All\s*rights\s*reserved|Cookies\s*&\s*Integrity\s*Policy|Whistleblower\s*Policy/i);
});
});
