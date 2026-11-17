# OfficeGuard commercial demo setup

The site uses fictional business details and illustrative product interactions. Replace the sample content before public marketing.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:5555`.

## Demo enquiries

The request form saves submissions to `data/demo-requests.jsonl` on the server. It does not send an email or create a sales-system record. The `data/` directory is excluded from source control. Back it up if the demo is hosted outside this computer.

```powershell
npm run demo:inbox
npm run demo:inbox -- --full
npm run demo:export -- --output demo-requests.csv
```

The final command writes a CSV into the current directory. Treat it as private contact data. Remove the CSV when it is no longer needed.

## Public launch checklist

1. Replace the fictional address, phone number, company profile, scenario, plans, and updates.
2. Have the demo privacy notice and terms replaced with approved text, including retention and a privacy contact.
3. Connect enquiries to a real sales inbox or customer-management system with monitoring and durable storage.
4. Replace illustrative product claims with validated evidence, customer permission, and verified availability.
5. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain. Set `ALLOW_INDEXING=true` only after all sample content is removed and approved.
6. Connect only genuine company social profiles. The demo Updates page is an internal sample destination.
