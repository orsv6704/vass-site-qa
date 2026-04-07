# Feature: Erbjudanden

## Source
- URL: https://www.vasscompany.se/erbjudanden/
- Language: Swedish
- Platform: Desktop
- Scope: Smoke

## Goal
Verify that a public desktop user can open the Erbjudanden page, confirm the correct destination, and observe the main offer, CTA, contact, and newsletter areas.

## Assumptions
- The page is publicly accessible
- No login is required
- Smoke scope should validate presence and identity, not deep interaction flows
- Offer categories should be treated as separate visible requirements

## Open questions
- Which offer categories are most business-critical and should later be upgraded from visibility checks to click/navigation checks?
- Should the contact and newsletter areas later include validation behavior, or remain presence-only?

## Requirements

### R1
**Title**  
Erbjudanden page identity is visible

**Requirement**  
A desktop user shall be able to open the Erbjudanden page and confirm that the correct destination has loaded.

**Acceptance criteria**  
- Given the user opens the Erbjudanden page on desktop
- When the page finishes loading
- Then the URL contains `/erbjudanden/`
- And the visible heading `Våra erbjudanden` is present

**Candidate test cases**  
- Verify the URL contains `/erbjudanden/`
- Verify the heading `Våra erbjudanden` is visible

**Priority**  
High

### R2
**Title**  
Primary contact CTA is visible

**Requirement**  
A desktop user shall be able to see the primary contact call to action on the Erbjudanden page.

**Acceptance criteria**  
- Given the Erbjudanden page has loaded
- Then the CTA `Jag vill bli kontaktad` is visible

**Candidate test cases**  
- Verify `Jag vill bli kontaktad` is visible

**Priority**  
High

### R3
**Title**  
Offer category Customer Experience & Salesforce is visible

**Requirement**  
A desktop user shall be able to see the Customer Experience & Salesforce offer category on the Erbjudanden page.

**Acceptance criteria**  
- Given the Erbjudanden page has loaded
- Then `Customer Experience & Salesforce` is visible

**Candidate test cases**  
- Verify `Customer Experience & Salesforce` is visible

**Priority**  
Medium

### R4
**Title**  
Offer category Data & Analytics is visible

**Requirement**  
A desktop user shall be able to see the Data & Analytics offer category on the Erbjudanden page.

**Acceptance criteria**  
- Given the Erbjudanden page has loaded
- Then `Data & Analytics` is visible

**Candidate test cases**  
- Verify `Data & Analytics` is visible

**Priority**  
Medium

### R5
**Title**  
Offer category ERP & Affärssystem is visible

**Requirement**  
A desktop user shall be able to see the ERP & Affärssystem offer category on the Erbjudanden page.

**Acceptance criteria**  
- Given the Erbjudanden page has loaded
- Then `ERP & Affärssystem` is visible

**Candidate test cases**  
- Verify `ERP & Affärssystem` is visible

**Priority**  
Medium

### R6
**Title**  
Offer category Business Transformation is visible

**Requirement**  
A desktop user shall be able to see the Business Transformation offer category on the Erbjudanden page.

**Acceptance criteria**  
- Given the Erbjudanden page has loaded
- Then `Business Transformation` is visible

**Candidate test cases**  
- Verify `Business Transformation` is visible

**Priority**  
Medium

### R7
**Title**  
Offer category Kvalitetssäkring is visible

**Requirement**  
A desktop user shall be able to see the Kvalitetssäkring offer category on the Erbjudanden page.

**Acceptance criteria**  
- Given the Erbjudanden page has loaded
- Then `Kvalitetssäkring` is visible

**Candidate test cases**  
- Verify `Kvalitetssäkring` is visible

**Priority**  
Medium

### R8
**Title**  
Offer category UX & Design is visible

**Requirement**  
A desktop user shall be able to see the UX & Design offer category on the Erbjudanden page.

**Acceptance criteria**  
- Given the Erbjudanden page has loaded
- Then `UX & Design` is visible

**Candidate test cases**  
- Verify `UX & Design` is visible

**Priority**  
Medium

### R9
**Title**  
Offer category Utveckling is visible

**Requirement**  
A desktop user shall be able to see the Utveckling offer category on the Erbjudanden page.

**Acceptance criteria**  
- Given the Erbjudanden page has loaded
- Then `Utveckling` is visible

**Candidate test cases**  
- Verify `Utveckling` is visible

**Priority**  
Medium

### R10
**Title**  
Offer category Webb & E-handel is visible

**Requirement**  
A desktop user shall be able to see the Webb & E-handel offer category on the Erbjudanden page.

**Acceptance criteria**  
- Given the Erbjudanden page has loaded
- Then `Webb & E-handel` is visible

**Candidate test cases**  
- Verify `Webb & E-handel` is visible

**Priority**  
Medium

### R11
**Title**  
Offer category AI is visible

**Requirement**  
A desktop user shall be able to see the AI offer category on the Erbjudanden page.

**Acceptance criteria**  
- Given the Erbjudanden page has loaded
- Then `AI` is visible

**Candidate test cases**  
- Verify `AI` is visible

**Priority**  
Medium

### R12
**Title**  
Contact area is visible

**Requirement**  
A desktop user shall be able to see a contact area on the Erbjudanden page.

**Acceptance criteria**  
- Given the Erbjudanden page has loaded
- Then a contact section is visible
- And visible form-related labels are present

**Candidate test cases**  
- Verify the contact area is visible
- Verify visible labels such as `Förnamn`, `Efternamn`, `E-post`, or `Telefon` are present

**Priority**  
High

### R13
**Title**  
Newsletter area is visible

**Requirement**  
A desktop user shall be able to see the newsletter signup area on the Erbjudanden page.

**Acceptance criteria**  
- Given the Erbjudanden page has loaded
- Then the newsletter section is visible
- And newsletter-related controls are present

**Candidate test cases**  
- Verify newsletter-related text is visible
- Verify visible controls such as `E-postadress` or `Prenumerera` are present

**Priority**  
Medium
