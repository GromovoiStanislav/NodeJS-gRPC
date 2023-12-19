// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var posts_service_pb = require('./posts_service_pb.js');

function serialize_posts_Empty(arg) {
  if (!(arg instanceof posts_service_pb.Empty)) {
    throw new Error('Expected argument of type posts.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_posts_Empty(buffer_arg) {
  return posts_service_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_posts_PostList(arg) {
  if (!(arg instanceof posts_service_pb.PostList)) {
    throw new Error('Expected argument of type posts.PostList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_posts_PostList(buffer_arg) {
  return posts_service_pb.PostList.deserializeBinary(new Uint8Array(buffer_arg));
}


var PostServiceService = exports.PostServiceService = {
  getPosts: {
    path: '/posts.PostService/GetPosts',
    requestStream: false,
    responseStream: false,
    requestType: posts_service_pb.Empty,
    responseType: posts_service_pb.PostList,
    requestSerialize: serialize_posts_Empty,
    requestDeserialize: deserialize_posts_Empty,
    responseSerialize: serialize_posts_PostList,
    responseDeserialize: deserialize_posts_PostList,
  },
};

exports.PostServiceClient = grpc.makeGenericClientConstructor(PostServiceService);
