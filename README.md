# info.skvidar.run
* Source for nettside [info.skvidar.run](https://info.skvidar.run).
* Det er et ganske standard [vitepress](https://vitepress.dev/) oppsett.

---

Hvordan starte lokalt miljø:
```
fyksen@xps-13:~/Projects128$ git clone git@github.com:fyksen/info.skvidar.run.git
# Cloning into 'info.skvidar.run'...
# remote: Enumerating objects: 476, done.
# remote: Counting objects: 100% (322/322), done.
# remote: Compressing objects: 100% (248/248), done.
# remote: Total 476 (delta 117), reused 254 (delta 67), pack-reused 154
# Receiving objects: 100% (476/476), 66.67 MiB | 7.67 MiB/s, done.
# Resolving deltas: 100% (172/172), done.
fyksen@xps-13:~/Projects$ cd info.skvidar.run
fyksen@xps-13:~/Projects/info.skvidar.run$ npm add -D vitepress

# added 68 packages, and audited 69 packages in 3s
# 
# 9 packages are looking for funding
#   run `npm fund` for details
# 
# 1 moderate severity vulnerability
# 
# To address all issues, run:
#   npm audit fix
# 
# Run `npm audit` for details.
fyksen@xps-13:~/Projects/info.skvidar.run$ npm run docs:dev

# > docs:dev
# > vitepress dev
# 
# 
#   vitepress v1.0.0-rc.20
# 
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: use --host to expose
#   ➜  press h to show help
```

## Custom scripts:

Dette er scripts som er laget for info.skvidar.run

### /src/arrangementer/attendees.vue

Dette er et script som kan brukes for å hente inn en liste over hvor mange deltakere det kommer til et arrangement.
For å bruke scriptet, kan man skrive:

```
<script setup>
import AttendeesTable from '/arrangementer/attendees.vue'
</script>

<AttendeesTable fetchUrl="/arrangementer/attendees/julebord23_attendees.json"/>
```

Merk at AttendeesTable linjen henter en .json fil. .json filene blir hentet hvert 5 minutt via et python script fra pretix (tickets.skvidar.run).
Formatet er /arrangementer/attendees/`<slug>`_attendees.json, hvor slug er shortname for arrangementet i pretix (tickets.skvidar.run).