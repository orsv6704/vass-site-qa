import { test, expect } from '@playwright/test';

test.describe('erbjudanden', () => {
test('ERB-001: Erbjudanden-sidan öppnas med korrekt svensk sidkontext', async ({ page }) => {
  // Requirement: Erbjudanden-sidan ska kunna öppnas på desktop och visa svensk sidkontext med brödsmula, huvudrubrik och ingress.
  // Observable outcome: Användaren ser sidan för erbjudanden med texterna \'Startsida Erbjudanden\', \'Våra erbjudanden\' och \'Ta ledning i den digitala eran.\'
  // Acceptance criteria:
  // - URL innehåller \'/erbjudanden\'
  // - Texten \'Startsida Erbjudanden\' är synlig
  // - Texten \'Våra erbjudanden\' är synlig
  // - Texten \'Ta ledning i den digitala eran.\' är synlig
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.url()).toContain('/erbjudanden');
  await expect(page.locator('body')).toContainText(/Startsida\s*Erbjudanden/i);
  await expect(page.locator('body')).toContainText(/Våra\s*erbjudanden/i);
  await expect(page.locator('body')).toContainText(/Ta\s*ledning\s*i\s*den\s*digitala\s*eran\./i);
});

test('ERB-002: Inledande CTA och nyckeltal visas', async ({ page }) => {
  // Requirement: Sidan ska visa den inledande CTA:n samt tre nyckeltal om expertis och erfarenhet.
  // Observable outcome: Användaren ser \'Jag vill bli kontaktad\' samt nyckeltalen \'250+ lokala experter\', \'4900+ globala experter\' och \'15+ års erfarenhet\'.
  // Acceptance criteria:
  // - Texten \'Jag vill bli kontaktad\' är synlig
  // - Texten \'250+ lokala experter\' är synlig
  // - Texten \'4900+ globala experter\' är synlig
  // - Texten \'15+ års erfarenhet\' är synlig
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Jag\s*vill\s*bli\s*kontaktad/i);
  await expect(page.locator('body')).toContainText(/250\+\s*lokala\s*experter/i);
  await expect(page.locator('body')).toContainText(/4900\+\s*globala\s*experter/i);
  await expect(page.locator('body')).toContainText(/15\+\s*års\s*erfarenhet/i);
});

test('ERB-003: Sektionen Hur vi hjälper dig visas', async ({ page }) => {
  // Requirement: Sidan ska visa sektionen \'Hur vi hjälper dig\' med tillhörande beskrivning.
  // Observable outcome: Användaren ser rubriken \'Hur vi hjälper dig\' och den inledande beskrivningen om lokala och globala specialister samt erfarenhet.
  // Acceptance criteria:
  // - Texten \'Hur vi hjälper dig\' är synlig
  // - Texten \'Vi är 250 lokala specialister, över 4000 globala, som behärskar det digitala hantverket.\' är synlig
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Hur\s*vi\s*hjälper\s*dig/i);
  await expect(page.locator('body')).toContainText(/Vi\s*är\s*250\s*lokala\s*specialister,\s*över\s*4000\s*globala,\s*som\s*behärskar\s*det\s*digitala\s*hantverket\./i);
});

test('ERB-004: Alla erbjudandekategorier visas', async ({ page }) => {
  // Requirement: Sidan ska visa samtliga synliga erbjudandekategorier som listas i innehållet.
  // Observable outcome: Användaren ser alla erbjudanderubriker på sidan.
  // Acceptance criteria:
  // - Texten \'ERP & Affärssystem\' är synlig
  // - Texten \'Kvalitetssäkring\' är synlig
  // - Texten \'Utveckling\' är synlig
  // - Texten \'Data & Analytics\' är synlig
  // - Texten \'Business Transformation\' är synlig
  // - Texten \'Customer Experience & Salesforce\' är synlig
  // - Texten \'UX & Design\' är synlig
  // - Texten \'Webb & E-handel\' är synlig
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/ERP\s*&\s*Affärssystem/i);
  await expect(page.locator('body')).toContainText(/Kvalitetssäkring/i);
  await expect(page.locator('body')).toContainText(/Utveckling/i);
  await expect(page.locator('body')).toContainText(/Data\s*&\s*Analytics/i);
  await expect(page.locator('body')).toContainText(/Business\s*Transformation/i);
  await expect(page.locator('body')).toContainText(/Customer\s*Experience\s*&\s*Salesforce/i);
  await expect(page.locator('body')).toContainText(/UX\s*&\s*Design/i);
  await expect(page.locator('body')).toContainText(/Webb\s*&\s*E-handel/i);
});

test('ERB-005: Beskrivningar för erbjudandena visas', async ({ page }) => {
  // Requirement: Varje synligt erbjudande ska ha en tillhörande beskrivning som är synlig på sidan.
  // Observable outcome: Användaren ser beskrivande text under respektive erbjudande.
  // Acceptance criteria:
  // - Texten \'ERP-systemet är ryggraden i din affär.\' är synlig
  // - Texten \'Framtidssäkra din verksamhet genom att inkludera kvalitetssäkring från början.\' är synlig
  // - Texten \'Från nyutveckling till förflyttning och integration, stöttar vi ditt företag med sömlös webb- och systemutveckling.\' är synlig
  // - Texten \'Låt data styra dina beslut mot tillväxt.\' är synlig
  // - Texten \'Maximera framgång genom effektiv digital transformation.\' är synlig
  // - Texten \'Skapa sömlösa kundupplevelser för ökad varumärkeskännedom och kundlojalitet.\' är synlig
  // - Texten \'Skapa konkurrensfördelar med användarcentrerad design.\' är synlig
  // - Texten \'Ta din webb och e-handel till nya höjder med fokus på kundupplevelse och konvertering.\' är synlig
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/ERP-systemet\s*är\s*ryggraden\s*i\s*din\s*affär\./i);
  await expect(page.locator('body')).toContainText(/Framtidssäkra\s*din\s*verksamhet\s*genom\s*att\s*inkludera\s*kvalitetssäkring\s*från\s*början\./i);
  await expect(page.locator('body')).toContainText(/Från\s*nyutveckling\s*till\s*förflyttning\s*och\s*integration,\s*stöttar\s*vi\s*ditt\s*företag\s*med\s*sömlös\s*webb-\s*och\s*systemutveckling\./i);
  await expect(page.locator('body')).toContainText(/Låt\s*data\s*styra\s*dina\s*beslut\s*mot\s*tillväxt\./i);
  await expect(page.locator('body')).toContainText(/Maximera\s*framgång\s*genom\s*effektiv\s*digital\s*transformation\./i);
  await expect(page.locator('body')).toContainText(/Skapa\s*sömlösa\s*kundupplevelser\s*för\s*ökad\s*varumärkeskännedom\s*och\s*kundlojalitet\./i);
  await expect(page.locator('body')).toContainText(/Skapa\s*konkurrensfördelar\s*med\s*användarcentrerad\s*design\./i);
  await expect(page.locator('body')).toContainText(/Ta\s*din\s*webb\s*och\s*e-handel\s*till\s*nya\s*höjder\s*med\s*fokus\s*på\s*kundupplevelse\s*och\s*konvertering\./i);
});

test('ERB-006: Kontaktsektion finns på sidan', async ({ page }) => {
  // Requirement: Sidan ska innehålla en synlig kontaktsektion för erbjudanden. På smoke-nivå kontrolleras endast närvaron av sektionen och dess synliga formulärtexter.
  // Observable outcome: Användaren ser rubriken \'Intresserad av våra erbjudanden?\' samt kontaktformulärets fält och samtyckestexter.
  // Acceptance criteria:
  // - Texten \'Intresserad av våra erbjudanden?\' är synlig
  // - Texten \'Skicka ett meddelande om du vill veta hur vi kan hjälpa dig och ditt företag att nå nästa nivå.\' är synlig
  // - Texten \'Förnamn\' är synlig
  // - Texten \'Efternamn\' är synlig
  // - Texten \'E-post\' är synlig
  // - Texten \'Telefon (Valfri)\' är synlig
  // - Texten \'Företag (Valfri)\' är synlig
  // - Texten \'Meddelande (Valfri)\' är synlig
  // - Texten \'Jag samtycker till att VASS behandlar mina personuppgifter.\' är synlig
  // - Texten \'Jag samtycker till att VASS kan skicka e-post i marknadsföringssyfte\' är synlig
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Intresserad\s*av\s*våra\s*erbjudanden\?/i);
  await expect(page.locator('body')).toContainText(/Skicka\s*ett\s*meddelande\s*om\s*du\s*vill\s*veta\s*hur\s*vi\s*kan\s*hjälpa\s*dig\s*och\s*ditt\s*företag\s*att\s*nå\s*nästa\s*nivå\./i);
  await expect(page.locator('body')).toContainText(/Jag\s*samtycker\s*till\s*att\s*VASS\s*behandlar\s*mina\s*personuppgifter\./i);
  await expect(page.locator('body')).toContainText(/Jag\s*samtycker\s*till\s*att\s*VASS\s*kan\s*skicka\s*e-post\s*i\s*marknadsföringssyfte/i);
});

test('ERB-007: Nyhetsbrevssektion finns på sidan', async ({ page }) => {
  // Requirement: Sidan ska innehålla en synlig nyhetsbrevssektion. På smoke-nivå kontrolleras endast närvaron av sektionen och dess synliga texter.
  // Observable outcome: Användaren ser nyhetsbrevsbeskrivningen, fältet för e-postadress, knappen \'Prenumerera\' och samtyckestexten.
  // Acceptance criteria:
  // - Texten \'Signa upp dig på vårt nyhetsbrev och ta del av eventinbjudningar, nyheter och insikter om den senaste tekniken och trenderna på marknaden.\' är synlig
  // - Texten \'E-postadress\' är synlig
  // - Texten \'Prenumerera\' är synlig
  // - Texten \'Jag samtycker till att VASS behandlar mina personuppgifter .\' är synlig
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Signa\s*upp\s*dig\s*på\s*vårt\s*nyhetsbrev\s*och\s*ta\s*del\s*av\s*eventinbjudningar,\s*nyheter\s*och\s*insikter\s*om\s*den\s*senaste\s*tekniken\s*och\s*trenderna\s*på\s*marknaden\./i);
  await expect(page.locator('body')).toContainText(/E-postadress/i);
  await expect(page.locator('body')).toContainText(/Prenumerera/i);
  await expect(page.locator('body')).toContainText(/Jag\s*samtycker\s*till\s*att\s*VASS\s*behandlar\s*mina\s*personuppgifter\s*\./i);
});

test('ERB-008: Footer visar kontaktuppgifter', async ({ page }) => {
  // Requirement: Footer ska visa företagets synliga kontaktuppgifter.
  // Observable outcome: Användaren ser adress, telefonnummer och e-postadress i footer.
  // Acceptance criteria:
  // - Texten \'Birger Jarlsgatan 9 Stockholm\' är synlig
  // - Texten \'+46 8-406 68 00\' är synlig
  // - Texten \'info.se@vasscompany.com\' är synlig
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Birger\s*Jarlsgatan\s*9\s*Stockholm/i);
  await expect(page.locator('body')).toContainText(/\+46\s*8-406\s*68\s*00/i);
  await expect(page.locator('body')).toContainText(/info\.se@vasscompany\.com/i);
});

test('ERB-009: Footer visar navigations- och policytexter', async ({ page }) => {
  // Requirement: Footer ska visa de synliga länknamnen och policytexterna som finns i sidans innehåll.
  // Observable outcome: Användaren ser footerlänkarna och policytexterna i sidfoten.
  // Acceptance criteria:
  // - Texten \'Erbjudanden\' är synlig
  // - Texten \'Våra kunder\' är synlig
  // - Texten \'Karriär\' är synlig
  // - Texten \'Kurser & Event\' är synlig
  // - Texten \'Insikter\' är synlig
  // - Texten \'Om oss\' är synlig
  // - Texten \'Kontakta oss\' är synlig
  // - Texten \'© 2026 VASS Sweden AB All rights reserved\' är synlig
  // - Texten \'Cookies & Integrity Policy\' är synlig
  // - Texten \'Whistleblower Policy\' är synlig
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/©\s*2026\s*VASS\s*Sweden\s*AB\s*All\s*rights\s*reserved/i);
  await expect(page.locator('body')).toContainText(/Cookies\s*&\s*Integrity\s*Policy/i);
  await expect(page.locator('body')).toContainText(/Whistleblower\s*Policy/i);
});
});
