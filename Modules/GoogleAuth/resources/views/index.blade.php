@extends('googleauth::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('googleauth.name') !!}</p>
@endsection
