<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Century Gothic', sans-serif; background-color: #f8f6ff; margin: 0; padding: 0; color: #1a0a36; }
        .wrapper { width: 100%; padding: 40px 0; }
        .content { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid rgba(212,175,55,0.2); }
        .header { background: linear-gradient(135deg, #1a0a36, #2D1B54); padding: 30px; text-align: center; }
        .header img { height: 50px; }
        .body { padding: 40px; line-height: 1.6; }
        .footer { padding: 30px; text-align: center; font-size: 12px; color: #6b5b95; border-top: 1px solid #f0ecfa; }
        .button { display: inline-block; background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; padding: 12px 30px; border-radius: 50px; text-decoration: none; font-weight: bold; margin-top: 20px; }
        h1 { color: #2D1B54; margin-bottom: 20px; }
        .gold { color: #D4AF37; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="content">
            <div class="header">
                <img src="{{ asset('logo.png') }}" alt="TrustBox Royale">
            </div>
            <div class="body">
                @yield('content')
            </div>
            <div class="footer">
                &copy; {{ date('Y') }} TrustBox Royale. Alle Rechte vorbehalten.<br>
                Dies ist eine automatische Nachricht, bitte antworte nicht direkt darauf.
            </div>
        </div>
    </div>
</body>
</html>
