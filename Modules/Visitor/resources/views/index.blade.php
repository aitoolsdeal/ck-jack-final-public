@extends('visitor::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('visitor.name') !!}</p>
@endsection
