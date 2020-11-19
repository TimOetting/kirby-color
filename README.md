# Kirby Color

Kirby-Color is a color picker plugin for Kirby CMS v3.

<img alt="Kirby Color Screenshot" src="https://raw.githubusercontent.com/TimOetting/kirby-color/master/preview.png" width="344">

## Installation

### Git

From the root of your kirby project:

```
git clone https://github.com/TimOetting/kirby-color.git site/plugins/kirby-color
```

### Composer

```
composer require timoetting/kirby-color
```

### Direct Download

Alternatively you can download the zip file, unzip it's contents into site/plugins/kirby-color.

## Example Blueprint Field Entry
```yaml
fields:
...
  color:
    type: color
    editableAlpha: true # (optional) if set to false, alpha value controls are not displayed
    default: "#EFCB69" # (optional)
    presets: # (optional)
      - "#EB6896"
      - "#C36894"
      - "#836890"
      - "#46698D"
      - "#0F6A8B"
```