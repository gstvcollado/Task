<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Rutas de la API y CSRF de Sanctum

    'allowed_methods' => ['*'], // Permitir todos los métodos HTTP

    'allowed_origins' => ['http://localhost:5173'], // Origen de tu aplicación React (ajústalo si es necesario)

    'allowed_origins_patterns' => [], // Opcional: puedes dejarlo vacío

    'allowed_headers' => ['*'], // Permitir todos los encabezados (si no estás restringiendo tipos de encabezados)

    'exposed_headers' => [], // Si no necesitas exponer encabezados adicionales, puedes dejarlo vacío

    'max_age' => 0, // Cuánto tiempo se debe almacenar la configuración de CORS en caché (0 es por defecto)

    'supports_credentials' => false, // Cambia a true si estás usando cookies o tokens de autenticación (como con Sanctum)

];
