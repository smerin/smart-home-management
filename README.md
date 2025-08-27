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

## Technical Decisions & Trade-offs

This implementation prioritizes a working end-to-end solution with proper error handling and type safety. Key decisions made:

**Database Migration**: Started with SQLite for rapid local development, then migrated to Postgres for deployment compatibility with Vercel. This allowed for a live demo while maintaining local development simplicity.

**Frontend Integration**: Built a functional frontend interface to demonstrate all API endpoints in action, providing visual confirmation of the backend functionality.

**Testing**: Due to time constraints, I focused on delivering a robust, working API with comprehensive error handling. In a production environment, I would implement unit and integration tests alongside feature development.
