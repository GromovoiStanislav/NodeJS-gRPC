// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var route_guide_pb = require('./route_guide_pb.js');

function serialize_routeguide_Feature(arg) {
  if (!(arg instanceof route_guide_pb.Feature)) {
    throw new Error('Expected argument of type routeguide.Feature');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_routeguide_Feature(buffer_arg) {
  return route_guide_pb.Feature.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_routeguide_Point(arg) {
  if (!(arg instanceof route_guide_pb.Point)) {
    throw new Error('Expected argument of type routeguide.Point');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_routeguide_Point(buffer_arg) {
  return route_guide_pb.Point.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_routeguide_Rectangle(arg) {
  if (!(arg instanceof route_guide_pb.Rectangle)) {
    throw new Error('Expected argument of type routeguide.Rectangle');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_routeguide_Rectangle(buffer_arg) {
  return route_guide_pb.Rectangle.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_routeguide_RouteNote(arg) {
  if (!(arg instanceof route_guide_pb.RouteNote)) {
    throw new Error('Expected argument of type routeguide.RouteNote');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_routeguide_RouteNote(buffer_arg) {
  return route_guide_pb.RouteNote.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_routeguide_RouteSummary(arg) {
  if (!(arg instanceof route_guide_pb.RouteSummary)) {
    throw new Error('Expected argument of type routeguide.RouteSummary');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_routeguide_RouteSummary(buffer_arg) {
  return route_guide_pb.RouteSummary.deserializeBinary(new Uint8Array(buffer_arg));
}


// Interface exported by the server.
var RouteGuideService = exports.RouteGuideService = {
  // A simple RPC.
//
// Obtains the feature at a given position.
//
// A feature with an empty name is returned if there's no feature at the given
// position.
getFeature: {
    path: '/routeguide.RouteGuide/GetFeature',
    requestStream: false,
    responseStream: false,
    requestType: route_guide_pb.Point,
    responseType: route_guide_pb.Feature,
    requestSerialize: serialize_routeguide_Point,
    requestDeserialize: deserialize_routeguide_Point,
    responseSerialize: serialize_routeguide_Feature,
    responseDeserialize: deserialize_routeguide_Feature,
  },
  // A server-to-client streaming RPC.
//
// Obtains the Features available within the given Rectangle.  Results are
// streamed rather than returned at once (e.g. in a response message with a
// repeated field), as the rectangle may cover a large area and contain a
// huge number of features.
listFeatures: {
    path: '/routeguide.RouteGuide/ListFeatures',
    requestStream: false,
    responseStream: true,
    requestType: route_guide_pb.Rectangle,
    responseType: route_guide_pb.Feature,
    requestSerialize: serialize_routeguide_Rectangle,
    requestDeserialize: deserialize_routeguide_Rectangle,
    responseSerialize: serialize_routeguide_Feature,
    responseDeserialize: deserialize_routeguide_Feature,
  },
  // A client-to-server streaming RPC.
//
// Accepts a stream of Points on a route being traversed, returning a
// RouteSummary when traversal is completed.
recordRoute: {
    path: '/routeguide.RouteGuide/RecordRoute',
    requestStream: true,
    responseStream: false,
    requestType: route_guide_pb.Point,
    responseType: route_guide_pb.RouteSummary,
    requestSerialize: serialize_routeguide_Point,
    requestDeserialize: deserialize_routeguide_Point,
    responseSerialize: serialize_routeguide_RouteSummary,
    responseDeserialize: deserialize_routeguide_RouteSummary,
  },
  // A Bidirectional streaming RPC.
//
// Accepts a stream of RouteNotes sent while a route is being traversed,
// while receiving other RouteNotes (e.g. from other users).
routeChat: {
    path: '/routeguide.RouteGuide/RouteChat',
    requestStream: true,
    responseStream: true,
    requestType: route_guide_pb.RouteNote,
    responseType: route_guide_pb.RouteNote,
    requestSerialize: serialize_routeguide_RouteNote,
    requestDeserialize: deserialize_routeguide_RouteNote,
    responseSerialize: serialize_routeguide_RouteNote,
    responseDeserialize: deserialize_routeguide_RouteNote,
  },
};

exports.RouteGuideClient = grpc.makeGenericClientConstructor(RouteGuideService);
