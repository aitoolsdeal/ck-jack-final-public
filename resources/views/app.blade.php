<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

    @if (app('setting'))
        <title inertia>
            {{ app('setting')->name }}
        </title>
        <meta
            name="description"
            content="{{ app('setting')->description }}"
        >

        <link
            rel="icon"
            href="{{ app('setting')->logo }}"
            type="image/png"
        >

        <meta
            property="og:type"
            content="website"
        >
        <meta
            property="og:url"
            content="{{ env('APP_URL', config('site.url')) }}"
        >
        <meta
            property="og:title"
            content="{{ app('setting')->title }}"
        >
        <meta
            property="og:description"
            content="{{ app('setting')->description }}"
        >
        <meta
            property="og:site_name"
            content="{{ app('setting')->name }}"
        >

        <meta
            property="og:image"
            content="{{ app('setting')->banner }}"
        >
        <meta
            property="og:image:width"
            content="1000"
        >
        <meta
            property="og:image:height"
            content="600"
        >
        <meta
            property="og:image:alt"
            content="{{ app('setting')->name }}"
        >

        <meta
            name="twitter:card"
            content="summary_large_image"
        >
        <meta
            name="twitter:title"
            content="{{ app('setting')->title }}"
        >
        <meta
            name="twitter:description"
            content="{{ app('setting')->description }}"
        >
        <meta
            name="twitter:image"
            content="{{ app('setting')->banner }}"
        >
    @endif

    <!-- Fonts -->
    <link
        rel="preconnect"
        href="https://fonts.bunny.net"
    >
    <link
        href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap"
        rel="stylesheet"
    />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">

    @inertia
</body>

</html>
