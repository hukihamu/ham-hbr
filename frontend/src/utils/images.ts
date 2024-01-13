export const images = {
    charSmallIcon(label: string) {
        return `https://hbr.quest/hbr/${label}SmallIcon.webp`
    },
    rarityIcon(tier: string) {
        return `https://hbr.quest/ui/IconRarity${tier}.webp`
    },
    typeIcon(type: string) {
        return `https://hbr.quest/at/${type}.webp`
    },
    elementIcon(element: string) {
        return `https://hbr.quest/ui/${element}.webp`
    },
    styleIcon(background: string) {
        return `https://hbr.quest/hbr/${background.replace('.webp', '_Thumbnail.webp')}`
    },
    styleSelectIcon(background: string) {
        return `https://hbr.quest/hbr/${background.replace('.webp', '_Select.webp')}`
    },
    // ノルドシュトロム結晶
    materialLv7() {
        return 'https://hbr.quest/hbr/ThumbnailMaterial_Lv7_Light.webp'
    },
    orbIcon(orb: string) {
        return `https://hbr.quest/hbr/${orb}.webp`
    }
    // https://hbr.quest/g/RKayamoriProfile.webp?34
}