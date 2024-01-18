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
    },
    teamIcon(team: string) {
        return `https://hbr.quest/ui/${team.toLowerCase().replace(' ', '')}.webp`
    },
    image(webp: string) {
        return `https://hbr.quest/hbr/${webp}`
    },
    eventBg(logo: string) {
        // 有効パスが少なめ
        return `https://hbr.quest/hbr/${logo.replace('Logo', 'Bg')}`
    },
    eventBanner(logo: string) {
        // 有効パスが少なめ
        return `https://hbr.quest/hbr/${logo.replace('Logo', 'Banner')}`
    }
    // https://hbr.quest/g/RKayamoriProfile.webp?34
}