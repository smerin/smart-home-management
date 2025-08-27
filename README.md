# Smart Home Management

A Next.js app connected to a postgres database via Prisma ORM

Demo: https://smart-home-management-one.vercel.app/

## Local setup

1. Add env vars provided via email
2. `npm install`
3. `npm run dev`

## API Endpoints

Several of these endpoints require an existing device ID. Replace `YOUR_DEVICE_ID_HERE` with the ID returned after registering a new device.

For a quick test (assuming it hasn't been deleted), you can use the ID `cmet1l64n0000uckdz8x7smz3` which is visible here: https://smart-home-management-one.vercel.app/device/cmet1l64n0000uckdz8x7smz3

### Register a new device

```
curl -X POST https://smart-home-management-one.vercel.app/api/devices \
  -H "Content-Type: application/json" \
  -d '{"name": "Kitchen Smart Light", "type": "LIGHT", "location": "Kitchen", "status": "ONLINE", "isActive": true, "properties": {"brightness": 75, "color": "#FF6B6B"}}'
```

### List all devices

```
curl https://smart-home-management-one.vercel.app/api/devices
```

### Get device details

```
curl https://smart-home-management-one.vercel.app/api/devices/YOUR_DEVICE_ID_HERE
```

### Update device status (turn light off)

```
curl -X PUT https://smart-home-management-one.vercel.app/api/devices/YOUR_DEVICE_ID_HERE -H "Content-Type: application/json" -d '{"isActive": false, "status": "OFFLINE"}'
```

### Update device status (adjust brightness and colour)

```
curl -X PUT https://smart-home-management-one.vercel.app/api/devices/YOUR_DEVICE_ID_HERE -H "Content-Type: application/json" -d '{"properties": {"brightness": 100, "color": "#00FF00"}}'
```

### Delete a device

```
curl -X DELETE https://smart-home-management-one.vercel.app/api/devices/YOUR_DEVICE_ID_HERE
```

## Error handling

### Test invalid device ID

```
curl https://smart-home-management-one.vercel.app/api/devices/xxx
```

Returns `{"error":"Device not found"}`

### Test bad input data (invalid device type)

```
curl -X POST https://smart-home-management-one.vercel.app/api/devices \
  -H "Content-Type: application/json" \
  -d '{"name": "My light", "type": "UNKNOWN_DEVICE", "location": "Kitchen", "status": "ONLINE", "isActive": true, "properties": {"brightness": 75, "color": "#FF6B6B"}}'
```

Returns `{"error":"Invalid device type"}`

### Test bad input data (invalid device status)

```
curl -X POST https://smart-home-management-one.vercel.app/api/devices \
  -H "Content-Type: application/json" \
  -d '{"name": "My light", "type": "LIGHT", "location": "Kitchen", "status": "UNKNOWN", "isActive": true, "properties": {"brightness": 75, "color": "#FF6B6B"}}'
```

Returns `{"error":"Invalid device status"}`

## Notes

As discussed in the initial interview, I am first and foremost a frontend developer. This technical challenge is more focused on the backend. I have tried to cover all the requirements, but have put more emphasis on the (simple) frontend to showcase my abilities there. All of the endpoints can be seen working on the demo: https://smart-home-management-one.vercel.app/

Initial development work was done using SQLite for simplicity. I wanted to publish a working demo, and Vercel is the simplest choice for a Next.js app using Server Side Rendering. However, Vercel does not support SQLite. I switched to using a Postgres database (hosted on Vercel) and pointed the local environment to use that.

One requirement that I have not covered is QA. Normally I would write tests alongside building features. However, due to the short time frame I focused on building out the APIs and frontend first. I did attempt to retrofit some tests, but struggled to mock some aspects of the Prisma setup. If this is a dealbreaker, please let me know and I will spend some more time setting this up and writing tests.
