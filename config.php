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
                'default' => function ($default = '#FFFFFF') {
                    return $default;
                },
                // 'value' => function ($value = null) {
                //     return $value;
                //     // return ($value != null) ? $value : $this->props['default'];
                // }
            ],
            // 'computed' => [
            //     'value' => function ($value = null) {
            //         return ($value != null) ? $value : $this->props['default'];
            //     }
            // ]
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
