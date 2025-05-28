<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

    <title>Email Verification</title>

    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="relative flex min-h-screen flex-col justify-center bg-gray-50 px-6 py-6 sm:py-12">
    <img
        src="{{ asset($app->logo) }}"
        class="mx-auto mb-8 h-20 w-20"
        alt="{{ $app->title }}"
    />

    <div
        class="relative mx-auto w-full max-w-xl rounded-lg border border-gray-200 bg-white px-4 py-8 shadow md:px-6 md:py-10">
        <h6 class="mb-8 text-center text-2xl font-medium">
            Verify Email Address
        </h6>
        <div class="border-y border-gray-200 py-6 text-gray-700">
            <p class="text mb-4 font-medium text-gray-900">
                Hello, {{ $user->name }}
            </p>
            <p>
                Please click the button below to verify your email address.
            </p>
            <div class="my-6 flex justify-center">
                <a
                    href="{{ $url }}"
                    target="_blank"
                    class="roud rounded-md bg-blue-500 px-4 py-2.5 text-white shadow-md shadow-blue-300 hover:bg-blue-600/90"
                >
                    Verify Email Address
                </a>
            </div>
            <p>
                Your email won't be registered or verified if you don't click the confirmation link above. If you
                received this email by mistake, simply delete it.
            </p>
        </div>
        <div class="pt-6">
            <p class="font-medium text-gray-900">Regards,</p>
            <p class="mt-2 text-gray-600">{{ $app->name }}</p>
        </div>
    </div>
</body>

</html>
