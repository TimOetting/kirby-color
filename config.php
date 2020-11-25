<?php

Kirby::plugin('timoetting/colorpicker', [
    'fields' => [
        'color' => [
            'props' => [
                'presets' => function ($presets = null) {
                    return Yaml::decode($presets);
                },
                'editableAlpha' => function ($editableAlpha = true) {
                    return $editableAlpha;
                },
                'default' => function ($default = null) {
                    return $default;
                },
                'value' => function ($value = "#FFFFFF") {
                    return $this->value ?? $this->default ?? $value;
                }
            ],
        ],
        'textext' => [
            'props' => [
                'value' => function ($value = null) {
                    return Yaml::decode($value);
                }
            ]
        ]
    ]
]);