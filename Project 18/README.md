## Cancellation gRPC example (JS)

This example shows how clients can cancel in-flight RPCs by cancelling the call object returned by the method invocation. The client will receive a status with code CANCELLED and the server handler's call object will emit either a 'cancelled' event or an 'end' event.

```
node server --port 8080
node client --target localhost:8080
```
