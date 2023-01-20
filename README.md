# React Keycloak integration

KeyCloak version: 20.0.3

## Setup

---

### Clone this repository with

```bash
git clone https://github.com/SuperKXT/react-keycloak
cd react-keycloak
```

### Run the script to download the server

- Linux

```bash
sudo chmod u+x ./setup-server.sh
./setup-server.sh
```

- Windows

```powershell
./setup-server.ps1
```

### Run the KeyCloak server

```bash
pnpm start-server-dev
```

### Copy .env.template to .env and update it if required

```bash
cp .env.template .env
```

### Start the frontend

```bash
pnpm start
```
