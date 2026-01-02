var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/generate-random-emoji/index.js
var require_generate_random_emoji = __commonJS((exports, module) => {
  var emojis = [
    {
      code: "U+1F600",
      name: "grinning face",
      image: "\uD83D\uDE00",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F603",
      name: "grinning face with big eyes",
      image: "\uD83D\uDE03",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F604",
      name: "grinning face with smiling eyes",
      image: "\uD83D\uDE04",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F601",
      name: "beaming face with smiling eyes",
      image: "\uD83D\uDE01",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F606",
      name: "grinning squinting face",
      image: "\uD83D\uDE06",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F605",
      name: "grinning face with sweat",
      image: "\uD83D\uDE05",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F923",
      name: "rolling on the floor laughing",
      image: "\uD83E\uDD23",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F602",
      name: "face with tears of joy",
      image: "\uD83D\uDE02",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F642",
      name: "slightly smiling face",
      image: "\uD83D\uDE42",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F643",
      name: "upside-down face",
      image: "\uD83D\uDE43",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1FAE0",
      name: "melting face",
      image: "\uD83E\uDEE0",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F609",
      name: "winking face",
      image: "\uD83D\uDE09",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F60A",
      name: "smiling face with smiling eyes",
      image: "\uD83D\uDE0A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F607",
      name: "smiling face with halo",
      image: "\uD83D\uDE07",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F970",
      name: "smiling face with hearts",
      image: "\uD83E\uDD70",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F60D",
      name: "smiling face with heart-eyes",
      image: "\uD83D\uDE0D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F929",
      name: "star-struck",
      image: "\uD83E\uDD29",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F618",
      name: "face blowing a kiss",
      image: "\uD83D\uDE18",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F617",
      name: "kissing face",
      image: "\uD83D\uDE17",
      category: "Smileys & Emotion"
    },
    {
      code: "U+263A",
      name: "smiling face",
      image: "☺",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F61A",
      name: "kissing face with closed eyes",
      image: "\uD83D\uDE1A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F619",
      name: "kissing face with smiling eyes",
      image: "\uD83D\uDE19",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F972",
      name: "smiling face with tear",
      image: "\uD83E\uDD72",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F60B",
      name: "face savoring food",
      image: "\uD83D\uDE0B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F61B",
      name: "face with tongue",
      image: "\uD83D\uDE1B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F61C",
      name: "winking face with tongue",
      image: "\uD83D\uDE1C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F92A",
      name: "zany face",
      image: "\uD83E\uDD2A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F61D",
      name: "squinting face with tongue",
      image: "\uD83D\uDE1D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F911",
      name: "money-mouth face",
      image: "\uD83E\uDD11",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F917",
      name: "smiling face with open hands",
      image: "\uD83E\uDD17",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F92D",
      name: "face with hand over mouth",
      image: "\uD83E\uDD2D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1FAE2",
      name: "face with open eyes and hand over mouth",
      image: "\uD83E\uDEE2",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1FAE3",
      name: "face with peeking eye",
      image: "\uD83E\uDEE3",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F92B",
      name: "shushing face",
      image: "\uD83E\uDD2B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F914",
      name: "thinking face",
      image: "\uD83E\uDD14",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1FAE1",
      name: "saluting face",
      image: "\uD83E\uDEE1",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F910",
      name: "zipper-mouth face",
      image: "\uD83E\uDD10",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F928",
      name: "face with raised eyebrow",
      image: "\uD83E\uDD28",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F610",
      name: "neutral face",
      image: "\uD83D\uDE10",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F611",
      name: "expressionless face",
      image: "\uD83D\uDE11",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F636",
      name: "face without mouth",
      image: "\uD83D\uDE36",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1FAE5",
      name: "dotted line face",
      image: "\uD83E\uDEE5",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F636 U+200D U+1F32B U+FE0F",
      name: "face in clouds",
      image: "\uD83D\uDE36‍\uD83C\uDF2B️",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F60F",
      name: "smirking face",
      image: "\uD83D\uDE0F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F612",
      name: "unamused face",
      image: "\uD83D\uDE12",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F644",
      name: "face with rolling eyes",
      image: "\uD83D\uDE44",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62C",
      name: "grimacing face",
      image: "\uD83D\uDE2C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62E U+200D U+1F4A8",
      name: "face exhaling",
      image: "\uD83D\uDE2E‍\uD83D\uDCA8",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F925",
      name: "lying face",
      image: "\uD83E\uDD25",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F60C",
      name: "relieved face",
      image: "\uD83D\uDE0C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F614",
      name: "pensive face",
      image: "\uD83D\uDE14",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62A",
      name: "sleepy face",
      image: "\uD83D\uDE2A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F924",
      name: "drooling face",
      image: "\uD83E\uDD24",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F634",
      name: "sleeping face",
      image: "\uD83D\uDE34",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F637",
      name: "face with medical mask",
      image: "\uD83D\uDE37",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F912",
      name: "face with thermometer",
      image: "\uD83E\uDD12",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F915",
      name: "face with head-bandage",
      image: "\uD83E\uDD15",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F922",
      name: "nauseated face",
      image: "\uD83E\uDD22",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F92E",
      name: "face vomiting",
      image: "\uD83E\uDD2E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F927",
      name: "sneezing face",
      image: "\uD83E\uDD27",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F975",
      name: "hot face",
      image: "\uD83E\uDD75",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F976",
      name: "cold face",
      image: "\uD83E\uDD76",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F974",
      name: "woozy face",
      image: "\uD83E\uDD74",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F635",
      name: "face with crossed-out eyes",
      image: "\uD83D\uDE35",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F635 U+200D U+1F4AB",
      name: "face with spiral eyes",
      image: "\uD83D\uDE35‍\uD83D\uDCAB",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F92F",
      name: "exploding head",
      image: "\uD83E\uDD2F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F920",
      name: "cowboy hat face",
      image: "\uD83E\uDD20",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F973",
      name: "partying face",
      image: "\uD83E\uDD73",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F978",
      name: "disguised face",
      image: "\uD83E\uDD78",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F60E",
      name: "smiling face with sunglasses",
      image: "\uD83D\uDE0E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F913",
      name: "nerd face",
      image: "\uD83E\uDD13",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F9D0",
      name: "face with monocle",
      image: "\uD83E\uDDD0",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F615",
      name: "confused face",
      image: "\uD83D\uDE15",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1FAE4",
      name: "face with diagonal mouth",
      image: "\uD83E\uDEE4",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F61F",
      name: "worried face",
      image: "\uD83D\uDE1F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F641",
      name: "slightly frowning face",
      image: "\uD83D\uDE41",
      category: "Smileys & Emotion"
    },
    {
      code: "U+2639",
      name: "frowning face",
      image: "☹",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62E",
      name: "face with open mouth",
      image: "\uD83D\uDE2E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62F",
      name: "hushed face",
      image: "\uD83D\uDE2F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F632",
      name: "astonished face",
      image: "\uD83D\uDE32",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F633",
      name: "flushed face",
      image: "\uD83D\uDE33",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F97A",
      name: "pleading face",
      image: "\uD83E\uDD7A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F979",
      name: "face holding back tears",
      image: "\uD83E\uDD79",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F626",
      name: "frowning face with open mouth",
      image: "\uD83D\uDE26",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F627",
      name: "anguished face",
      image: "\uD83D\uDE27",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F628",
      name: "fearful face",
      image: "\uD83D\uDE28",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F630",
      name: "anxious face with sweat",
      image: "\uD83D\uDE30",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F625",
      name: "sad but relieved face",
      image: "\uD83D\uDE25",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F622",
      name: "crying face",
      image: "\uD83D\uDE22",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62D",
      name: "loudly crying face",
      image: "\uD83D\uDE2D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F631",
      name: "face screaming in fear",
      image: "\uD83D\uDE31",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F616",
      name: "confounded face",
      image: "\uD83D\uDE16",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F623",
      name: "persevering face",
      image: "\uD83D\uDE23",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F61E",
      name: "disappointed face",
      image: "\uD83D\uDE1E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F613",
      name: "downcast face with sweat",
      image: "\uD83D\uDE13",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F629",
      name: "weary face",
      image: "\uD83D\uDE29",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62B",
      name: "tired face",
      image: "\uD83D\uDE2B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F971",
      name: "yawning face",
      image: "\uD83E\uDD71",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F624",
      name: "face with steam from nose",
      image: "\uD83D\uDE24",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F621",
      name: "enraged face",
      image: "\uD83D\uDE21",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F620",
      name: "angry face",
      image: "\uD83D\uDE20",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F92C",
      name: "face with symbols on mouth",
      image: "\uD83E\uDD2C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F608",
      name: "smiling face with horns",
      image: "\uD83D\uDE08",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F47F",
      name: "angry face with horns",
      image: "\uD83D\uDC7F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F480",
      name: "skull",
      image: "\uD83D\uDC80",
      category: "Smileys & Emotion"
    },
    {
      code: "U+2620",
      name: "skull and crossbones",
      image: "☠",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4A9",
      name: "pile of poo",
      image: "\uD83D\uDCA9",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F921",
      name: "clown face",
      image: "\uD83E\uDD21",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F479",
      name: "ogre",
      image: "\uD83D\uDC79",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F47A",
      name: "goblin",
      image: "\uD83D\uDC7A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F47B",
      name: "ghost",
      image: "\uD83D\uDC7B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F47D",
      name: "alien",
      image: "\uD83D\uDC7D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F47E",
      name: "alien monster",
      image: "\uD83D\uDC7E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F916",
      name: "robot",
      image: "\uD83E\uDD16",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F63A",
      name: "grinning cat",
      image: "\uD83D\uDE3A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F638",
      name: "grinning cat with smiling eyes",
      image: "\uD83D\uDE38",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F639",
      name: "cat with tears of joy",
      image: "\uD83D\uDE39",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F63B",
      name: "smiling cat with heart-eyes",
      image: "\uD83D\uDE3B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F63C",
      name: "cat with wry smile",
      image: "\uD83D\uDE3C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F63D",
      name: "kissing cat",
      image: "\uD83D\uDE3D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F640",
      name: "weary cat",
      image: "\uD83D\uDE40",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F63F",
      name: "crying cat",
      image: "\uD83D\uDE3F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F63E",
      name: "pouting cat",
      image: "\uD83D\uDE3E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F648",
      name: "see-no-evil monkey",
      image: "\uD83D\uDE48",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F649",
      name: "hear-no-evil monkey",
      image: "\uD83D\uDE49",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F64A",
      name: "speak-no-evil monkey",
      image: "\uD83D\uDE4A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F48C",
      name: "love letter",
      image: "\uD83D\uDC8C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F498",
      name: "heart with arrow",
      image: "\uD83D\uDC98",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F49D",
      name: "heart with ribbon",
      image: "\uD83D\uDC9D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F496",
      name: "sparkling heart",
      image: "\uD83D\uDC96",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F497",
      name: "growing heart",
      image: "\uD83D\uDC97",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F493",
      name: "beating heart",
      image: "\uD83D\uDC93",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F49E",
      name: "revolving hearts",
      image: "\uD83D\uDC9E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F495",
      name: "two hearts",
      image: "\uD83D\uDC95",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F49F",
      name: "heart decoration",
      image: "\uD83D\uDC9F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+2763",
      name: "heart exclamation",
      image: "❣",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F494",
      name: "broken heart",
      image: "\uD83D\uDC94",
      category: "Smileys & Emotion"
    },
    {
      code: "U+2764 U+FE0F U+200D U+1F525",
      name: "heart on fire",
      image: "❤️‍\uD83D\uDD25",
      category: "Smileys & Emotion"
    },
    {
      code: "U+2764 U+FE0F U+200D U+1FA79",
      name: "mending heart",
      image: "❤️‍\uD83E\uDE79",
      category: "Smileys & Emotion"
    },
    {
      code: "U+2764",
      name: "red heart",
      image: "❤",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F9E1",
      name: "orange heart",
      image: "\uD83E\uDDE1",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F49B",
      name: "yellow heart",
      image: "\uD83D\uDC9B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F49A",
      name: "green heart",
      image: "\uD83D\uDC9A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F499",
      name: "blue heart",
      image: "\uD83D\uDC99",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F49C",
      name: "purple heart",
      image: "\uD83D\uDC9C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F90E",
      name: "brown heart",
      image: "\uD83E\uDD0E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F5A4",
      name: "black heart",
      image: "\uD83D\uDDA4",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F90D",
      name: "white heart",
      image: "\uD83E\uDD0D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F48B",
      name: "kiss mark",
      image: "\uD83D\uDC8B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4AF",
      name: "hundred points",
      image: "\uD83D\uDCAF",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4A2",
      name: "anger symbol",
      image: "\uD83D\uDCA2",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4A5",
      name: "collision",
      image: "\uD83D\uDCA5",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4AB",
      name: "dizzy",
      image: "\uD83D\uDCAB",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4A6",
      name: "sweat droplets",
      image: "\uD83D\uDCA6",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4A8",
      name: "dashing away",
      image: "\uD83D\uDCA8",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F573",
      name: "hole",
      image: "\uD83D\uDD73",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4AC",
      name: "speech balloon",
      image: "\uD83D\uDCAC",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F441 U+FE0F U+200D U+1F5E8 U+FE0F",
      name: "eye in speech bubble",
      image: "\uD83D\uDC41️‍\uD83D\uDDE8️",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F5E8",
      name: "left speech bubble",
      image: "\uD83D\uDDE8",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F5EF",
      name: "right anger bubble",
      image: "\uD83D\uDDEF",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4AD",
      name: "thought balloon",
      image: "\uD83D\uDCAD",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4A4",
      name: "ZZZ",
      image: "\uD83D\uDCA4",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F44B",
      name: "waving hand",
      image: "\uD83D\uDC4B",
      category: "People & Body"
    },
    {
      code: "U+1F91A",
      name: "raised back of hand",
      image: "\uD83E\uDD1A",
      category: "People & Body"
    },
    {
      code: "U+1F590",
      name: "hand with fingers splayed",
      image: "\uD83D\uDD90",
      category: "People & Body"
    },
    {
      code: "U+270B",
      name: "raised hand",
      image: "✋",
      category: "People & Body"
    },
    {
      code: "U+1F596",
      name: "vulcan salute",
      image: "\uD83D\uDD96",
      category: "People & Body"
    },
    {
      code: "U+1FAF1",
      name: "rightwards hand",
      image: "\uD83E\uDEF1",
      category: "People & Body"
    },
    {
      code: "U+1FAF2",
      name: "leftwards hand",
      image: "\uD83E\uDEF2",
      category: "People & Body"
    },
    {
      code: "U+1FAF3",
      name: "palm down hand",
      image: "\uD83E\uDEF3",
      category: "People & Body"
    },
    {
      code: "U+1FAF4",
      name: "palm up hand",
      image: "\uD83E\uDEF4",
      category: "People & Body"
    },
    {
      code: "U+1F44C",
      name: "OK hand",
      image: "\uD83D\uDC4C",
      category: "People & Body"
    },
    {
      code: "U+1F90C",
      name: "pinched fingers",
      image: "\uD83E\uDD0C",
      category: "People & Body"
    },
    {
      code: "U+1F90F",
      name: "pinching hand",
      image: "\uD83E\uDD0F",
      category: "People & Body"
    },
    {
      code: "U+270C",
      name: "victory hand",
      image: "✌",
      category: "People & Body"
    },
    {
      code: "U+1F91E",
      name: "crossed fingers",
      image: "\uD83E\uDD1E",
      category: "People & Body"
    },
    {
      code: "U+1FAF0",
      name: "hand with index finger and thumb crossed",
      image: "\uD83E\uDEF0",
      category: "People & Body"
    },
    {
      code: "U+1F91F",
      name: "love-you gesture",
      image: "\uD83E\uDD1F",
      category: "People & Body"
    },
    {
      code: "U+1F918",
      name: "sign of the horns",
      image: "\uD83E\uDD18",
      category: "People & Body"
    },
    {
      code: "U+1F919",
      name: "call me hand",
      image: "\uD83E\uDD19",
      category: "People & Body"
    },
    {
      code: "U+1F448",
      name: "backhand index pointing left",
      image: "\uD83D\uDC48",
      category: "People & Body"
    },
    {
      code: "U+1F449",
      name: "backhand index pointing right",
      image: "\uD83D\uDC49",
      category: "People & Body"
    },
    {
      code: "U+1F446",
      name: "backhand index pointing up",
      image: "\uD83D\uDC46",
      category: "People & Body"
    },
    {
      code: "U+1F595",
      name: "middle finger",
      image: "\uD83D\uDD95",
      category: "People & Body"
    },
    {
      code: "U+1F447",
      name: "backhand index pointing down",
      image: "\uD83D\uDC47",
      category: "People & Body"
    },
    {
      code: "U+261D",
      name: "index pointing up",
      image: "☝",
      category: "People & Body"
    },
    {
      code: "U+1FAF5",
      name: "index pointing at the viewer",
      image: "\uD83E\uDEF5",
      category: "People & Body"
    },
    {
      code: "U+1F44D",
      name: "thumbs up",
      image: "\uD83D\uDC4D",
      category: "People & Body"
    },
    {
      code: "U+1F44E",
      name: "thumbs down",
      image: "\uD83D\uDC4E",
      category: "People & Body"
    },
    {
      code: "U+270A",
      name: "raised fist",
      image: "✊",
      category: "People & Body"
    },
    {
      code: "U+1F44A",
      name: "oncoming fist",
      image: "\uD83D\uDC4A",
      category: "People & Body"
    },
    {
      code: "U+1F91B",
      name: "left-facing fist",
      image: "\uD83E\uDD1B",
      category: "People & Body"
    },
    {
      code: "U+1F91C",
      name: "right-facing fist",
      image: "\uD83E\uDD1C",
      category: "People & Body"
    },
    {
      code: "U+1F44F",
      name: "clapping hands",
      image: "\uD83D\uDC4F",
      category: "People & Body"
    },
    {
      code: "U+1F64C",
      name: "raising hands",
      image: "\uD83D\uDE4C",
      category: "People & Body"
    },
    {
      code: "U+1FAF6",
      name: "heart hands",
      image: "\uD83E\uDEF6",
      category: "People & Body"
    },
    {
      code: "U+1F450",
      name: "open hands",
      image: "\uD83D\uDC50",
      category: "People & Body"
    },
    {
      code: "U+1F932",
      name: "palms up together",
      image: "\uD83E\uDD32",
      category: "People & Body"
    },
    {
      code: "U+1F91D",
      name: "handshake",
      image: "\uD83E\uDD1D",
      category: "People & Body"
    },
    {
      code: "U+1F64F",
      name: "folded hands",
      image: "\uD83D\uDE4F",
      category: "People & Body"
    },
    {
      code: "U+270D",
      name: "writing hand",
      image: "✍",
      category: "People & Body"
    },
    {
      code: "U+1F485",
      name: "nail polish",
      image: "\uD83D\uDC85",
      category: "People & Body"
    },
    {
      code: "U+1F933",
      name: "selfie",
      image: "\uD83E\uDD33",
      category: "People & Body"
    },
    {
      code: "U+1F4AA",
      name: "flexed biceps",
      image: "\uD83D\uDCAA",
      category: "People & Body"
    },
    {
      code: "U+1F9BE",
      name: "mechanical arm",
      image: "\uD83E\uDDBE",
      category: "People & Body"
    },
    {
      code: "U+1F9BF",
      name: "mechanical leg",
      image: "\uD83E\uDDBF",
      category: "People & Body"
    },
    {
      code: "U+1F9B5",
      name: "leg",
      image: "\uD83E\uDDB5",
      category: "People & Body"
    },
    {
      code: "U+1F9B6",
      name: "foot",
      image: "\uD83E\uDDB6",
      category: "People & Body"
    },
    {
      code: "U+1F442",
      name: "ear",
      image: "\uD83D\uDC42",
      category: "People & Body"
    },
    {
      code: "U+1F9BB",
      name: "ear with hearing aid",
      image: "\uD83E\uDDBB",
      category: "People & Body"
    },
    {
      code: "U+1F443",
      name: "nose",
      image: "\uD83D\uDC43",
      category: "People & Body"
    },
    {
      code: "U+1F9E0",
      name: "brain",
      image: "\uD83E\uDDE0",
      category: "People & Body"
    },
    {
      code: "U+1FAC0",
      name: "anatomical heart",
      image: "\uD83E\uDEC0",
      category: "People & Body"
    },
    {
      code: "U+1FAC1",
      name: "lungs",
      image: "\uD83E\uDEC1",
      category: "People & Body"
    },
    {
      code: "U+1F9B7",
      name: "tooth",
      image: "\uD83E\uDDB7",
      category: "People & Body"
    },
    {
      code: "U+1F9B4",
      name: "bone",
      image: "\uD83E\uDDB4",
      category: "People & Body"
    },
    {
      code: "U+1F440",
      name: "eyes",
      image: "\uD83D\uDC40",
      category: "People & Body"
    },
    {
      code: "U+1F441",
      name: "eye",
      image: "\uD83D\uDC41",
      category: "People & Body"
    },
    {
      code: "U+1F445",
      name: "tongue",
      image: "\uD83D\uDC45",
      category: "People & Body"
    },
    {
      code: "U+1F444",
      name: "mouth",
      image: "\uD83D\uDC44",
      category: "People & Body"
    },
    {
      code: "U+1FAE6",
      name: "biting lip",
      image: "\uD83E\uDEE6",
      category: "People & Body"
    },
    {
      code: "U+1F476",
      name: "baby",
      image: "\uD83D\uDC76",
      category: "People & Body"
    },
    {
      code: "U+1F9D2",
      name: "child",
      image: "\uD83E\uDDD2",
      category: "People & Body"
    },
    {
      code: "U+1F466",
      name: "boy",
      image: "\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F467",
      name: "girl",
      image: "\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F9D1",
      name: "person",
      image: "\uD83E\uDDD1",
      category: "People & Body"
    },
    {
      code: "U+1F471",
      name: "person: blond hair",
      image: "\uD83D\uDC71",
      category: "People & Body"
    },
    {
      code: "U+1F468",
      name: "man",
      image: "\uD83D\uDC68",
      category: "People & Body"
    },
    {
      code: "U+1F9D4",
      name: "person: beard",
      image: "\uD83E\uDDD4",
      category: "People & Body"
    },
    {
      code: "U+1F9D4 U+200D U+2642 U+FE0F",
      name: "man: beard",
      image: "\uD83E\uDDD4‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9D4 U+200D U+2640 U+FE0F",
      name: "woman: beard",
      image: "\uD83E\uDDD4‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9B0",
      name: "man: red hair",
      image: "\uD83D\uDC68‍\uD83E\uDDB0",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9B1",
      name: "man: curly hair",
      image: "\uD83D\uDC68‍\uD83E\uDDB1",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9B3",
      name: "man: white hair",
      image: "\uD83D\uDC68‍\uD83E\uDDB3",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9B2",
      name: "man: bald",
      image: "\uD83D\uDC68‍\uD83E\uDDB2",
      category: "People & Body"
    },
    {
      code: "U+1F469",
      name: "woman",
      image: "\uD83D\uDC69",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9B0",
      name: "woman: red hair",
      image: "\uD83D\uDC69‍\uD83E\uDDB0",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9B0",
      name: "person: red hair",
      image: "\uD83E\uDDD1‍\uD83E\uDDB0",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9B1",
      name: "woman: curly hair",
      image: "\uD83D\uDC69‍\uD83E\uDDB1",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9B1",
      name: "person: curly hair",
      image: "\uD83E\uDDD1‍\uD83E\uDDB1",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9B3",
      name: "woman: white hair",
      image: "\uD83D\uDC69‍\uD83E\uDDB3",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9B3",
      name: "person: white hair",
      image: "\uD83E\uDDD1‍\uD83E\uDDB3",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9B2",
      name: "woman: bald",
      image: "\uD83D\uDC69‍\uD83E\uDDB2",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9B2",
      name: "person: bald",
      image: "\uD83E\uDDD1‍\uD83E\uDDB2",
      category: "People & Body"
    },
    {
      code: "U+1F471 U+200D U+2640 U+FE0F",
      name: "woman: blond hair",
      image: "\uD83D\uDC71‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F471 U+200D U+2642 U+FE0F",
      name: "man: blond hair",
      image: "\uD83D\uDC71‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9D3",
      name: "older person",
      image: "\uD83E\uDDD3",
      category: "People & Body"
    },
    {
      code: "U+1F474",
      name: "old man",
      image: "\uD83D\uDC74",
      category: "People & Body"
    },
    {
      code: "U+1F475",
      name: "old woman",
      image: "\uD83D\uDC75",
      category: "People & Body"
    },
    {
      code: "U+1F64D",
      name: "person frowning",
      image: "\uD83D\uDE4D",
      category: "People & Body"
    },
    {
      code: "U+1F64D U+200D U+2642 U+FE0F",
      name: "man frowning",
      image: "\uD83D\uDE4D‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F64D U+200D U+2640 U+FE0F",
      name: "woman frowning",
      image: "\uD83D\uDE4D‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F64E",
      name: "person pouting",
      image: "\uD83D\uDE4E",
      category: "People & Body"
    },
    {
      code: "U+1F64E U+200D U+2642 U+FE0F",
      name: "man pouting",
      image: "\uD83D\uDE4E‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F64E U+200D U+2640 U+FE0F",
      name: "woman pouting",
      image: "\uD83D\uDE4E‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F645",
      name: "person gesturing NO",
      image: "\uD83D\uDE45",
      category: "People & Body"
    },
    {
      code: "U+1F645 U+200D U+2642 U+FE0F",
      name: "man gesturing NO",
      image: "\uD83D\uDE45‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F645 U+200D U+2640 U+FE0F",
      name: "woman gesturing NO",
      image: "\uD83D\uDE45‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F646",
      name: "person gesturing OK",
      image: "\uD83D\uDE46",
      category: "People & Body"
    },
    {
      code: "U+1F646 U+200D U+2642 U+FE0F",
      name: "man gesturing OK",
      image: "\uD83D\uDE46‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F646 U+200D U+2640 U+FE0F",
      name: "woman gesturing OK",
      image: "\uD83D\uDE46‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F481",
      name: "person tipping hand",
      image: "\uD83D\uDC81",
      category: "People & Body"
    },
    {
      code: "U+1F481 U+200D U+2642 U+FE0F",
      name: "man tipping hand",
      image: "\uD83D\uDC81‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F481 U+200D U+2640 U+FE0F",
      name: "woman tipping hand",
      image: "\uD83D\uDC81‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F64B",
      name: "person raising hand",
      image: "\uD83D\uDE4B",
      category: "People & Body"
    },
    {
      code: "U+1F64B U+200D U+2642 U+FE0F",
      name: "man raising hand",
      image: "\uD83D\uDE4B‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F64B U+200D U+2640 U+FE0F",
      name: "woman raising hand",
      image: "\uD83D\uDE4B‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9CF",
      name: "deaf person",
      image: "\uD83E\uDDCF",
      category: "People & Body"
    },
    {
      code: "U+1F9CF U+200D U+2642 U+FE0F",
      name: "deaf man",
      image: "\uD83E\uDDCF‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9CF U+200D U+2640 U+FE0F",
      name: "deaf woman",
      image: "\uD83E\uDDCF‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F647",
      name: "person bowing",
      image: "\uD83D\uDE47",
      category: "People & Body"
    },
    {
      code: "U+1F647 U+200D U+2642 U+FE0F",
      name: "man bowing",
      image: "\uD83D\uDE47‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F647 U+200D U+2640 U+FE0F",
      name: "woman bowing",
      image: "\uD83D\uDE47‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F926",
      name: "person facepalming",
      image: "\uD83E\uDD26",
      category: "People & Body"
    },
    {
      code: "U+1F926 U+200D U+2642 U+FE0F",
      name: "man facepalming",
      image: "\uD83E\uDD26‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F926 U+200D U+2640 U+FE0F",
      name: "woman facepalming",
      image: "\uD83E\uDD26‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F937",
      name: "person shrugging",
      image: "\uD83E\uDD37",
      category: "People & Body"
    },
    {
      code: "U+1F937 U+200D U+2642 U+FE0F",
      name: "man shrugging",
      image: "\uD83E\uDD37‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F937 U+200D U+2640 U+FE0F",
      name: "woman shrugging",
      image: "\uD83E\uDD37‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+2695 U+FE0F",
      name: "health worker",
      image: "\uD83E\uDDD1‍⚕️",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+2695 U+FE0F",
      name: "man health worker",
      image: "\uD83D\uDC68‍⚕️",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2695 U+FE0F",
      name: "woman health worker",
      image: "\uD83D\uDC69‍⚕️",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F393",
      name: "student",
      image: "\uD83E\uDDD1‍\uD83C\uDF93",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F393",
      name: "man student",
      image: "\uD83D\uDC68‍\uD83C\uDF93",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F393",
      name: "woman student",
      image: "\uD83D\uDC69‍\uD83C\uDF93",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F3EB",
      name: "teacher",
      image: "\uD83E\uDDD1‍\uD83C\uDFEB",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F3EB",
      name: "man teacher",
      image: "\uD83D\uDC68‍\uD83C\uDFEB",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F3EB",
      name: "woman teacher",
      image: "\uD83D\uDC69‍\uD83C\uDFEB",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+2696 U+FE0F",
      name: "judge",
      image: "\uD83E\uDDD1‍⚖️",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+2696 U+FE0F",
      name: "man judge",
      image: "\uD83D\uDC68‍⚖️",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2696 U+FE0F",
      name: "woman judge",
      image: "\uD83D\uDC69‍⚖️",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F33E",
      name: "farmer",
      image: "\uD83E\uDDD1‍\uD83C\uDF3E",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F33E",
      name: "man farmer",
      image: "\uD83D\uDC68‍\uD83C\uDF3E",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F33E",
      name: "woman farmer",
      image: "\uD83D\uDC69‍\uD83C\uDF3E",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F373",
      name: "cook",
      image: "\uD83E\uDDD1‍\uD83C\uDF73",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F373",
      name: "man cook",
      image: "\uD83D\uDC68‍\uD83C\uDF73",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F373",
      name: "woman cook",
      image: "\uD83D\uDC69‍\uD83C\uDF73",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F527",
      name: "mechanic",
      image: "\uD83E\uDDD1‍\uD83D\uDD27",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F527",
      name: "man mechanic",
      image: "\uD83D\uDC68‍\uD83D\uDD27",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F527",
      name: "woman mechanic",
      image: "\uD83D\uDC69‍\uD83D\uDD27",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F3ED",
      name: "factory worker",
      image: "\uD83E\uDDD1‍\uD83C\uDFED",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F3ED",
      name: "man factory worker",
      image: "\uD83D\uDC68‍\uD83C\uDFED",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F3ED",
      name: "woman factory worker",
      image: "\uD83D\uDC69‍\uD83C\uDFED",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F4BC",
      name: "office worker",
      image: "\uD83E\uDDD1‍\uD83D\uDCBC",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F4BC",
      name: "man office worker",
      image: "\uD83D\uDC68‍\uD83D\uDCBC",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F4BC",
      name: "woman office worker",
      image: "\uD83D\uDC69‍\uD83D\uDCBC",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F52C",
      name: "scientist",
      image: "\uD83E\uDDD1‍\uD83D\uDD2C",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F52C",
      name: "man scientist",
      image: "\uD83D\uDC68‍\uD83D\uDD2C",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F52C",
      name: "woman scientist",
      image: "\uD83D\uDC69‍\uD83D\uDD2C",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F4BB",
      name: "technologist",
      image: "\uD83E\uDDD1‍\uD83D\uDCBB",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F4BB",
      name: "man technologist",
      image: "\uD83D\uDC68‍\uD83D\uDCBB",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F4BB",
      name: "woman technologist",
      image: "\uD83D\uDC69‍\uD83D\uDCBB",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F3A4",
      name: "singer",
      image: "\uD83E\uDDD1‍\uD83C\uDFA4",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F3A4",
      name: "man singer",
      image: "\uD83D\uDC68‍\uD83C\uDFA4",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F3A4",
      name: "woman singer",
      image: "\uD83D\uDC69‍\uD83C\uDFA4",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F3A8",
      name: "artist",
      image: "\uD83E\uDDD1‍\uD83C\uDFA8",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F3A8",
      name: "man artist",
      image: "\uD83D\uDC68‍\uD83C\uDFA8",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F3A8",
      name: "woman artist",
      image: "\uD83D\uDC69‍\uD83C\uDFA8",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+2708 U+FE0F",
      name: "pilot",
      image: "\uD83E\uDDD1‍✈️",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+2708 U+FE0F",
      name: "man pilot",
      image: "\uD83D\uDC68‍✈️",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2708 U+FE0F",
      name: "woman pilot",
      image: "\uD83D\uDC69‍✈️",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F680",
      name: "astronaut",
      image: "\uD83E\uDDD1‍\uD83D\uDE80",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F680",
      name: "man astronaut",
      image: "\uD83D\uDC68‍\uD83D\uDE80",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F680",
      name: "woman astronaut",
      image: "\uD83D\uDC69‍\uD83D\uDE80",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F692",
      name: "firefighter",
      image: "\uD83E\uDDD1‍\uD83D\uDE92",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F692",
      name: "man firefighter",
      image: "\uD83D\uDC68‍\uD83D\uDE92",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F692",
      name: "woman firefighter",
      image: "\uD83D\uDC69‍\uD83D\uDE92",
      category: "People & Body"
    },
    {
      code: "U+1F46E",
      name: "police officer",
      image: "\uD83D\uDC6E",
      category: "People & Body"
    },
    {
      code: "U+1F46E U+200D U+2642 U+FE0F",
      name: "man police officer",
      image: "\uD83D\uDC6E‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F46E U+200D U+2640 U+FE0F",
      name: "woman police officer",
      image: "\uD83D\uDC6E‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F575",
      name: "detective",
      image: "\uD83D\uDD75",
      category: "People & Body"
    },
    {
      code: "U+1F575 U+FE0F U+200D U+2642 U+FE0F",
      name: "man detective",
      image: "\uD83D\uDD75️‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F575 U+FE0F U+200D U+2640 U+FE0F",
      name: "woman detective",
      image: "\uD83D\uDD75️‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F482",
      name: "guard",
      image: "\uD83D\uDC82",
      category: "People & Body"
    },
    {
      code: "U+1F482 U+200D U+2642 U+FE0F",
      name: "man guard",
      image: "\uD83D\uDC82‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F482 U+200D U+2640 U+FE0F",
      name: "woman guard",
      image: "\uD83D\uDC82‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F977",
      name: "ninja",
      image: "\uD83E\uDD77",
      category: "People & Body"
    },
    {
      code: "U+1F477",
      name: "construction worker",
      image: "\uD83D\uDC77",
      category: "People & Body"
    },
    {
      code: "U+1F477 U+200D U+2642 U+FE0F",
      name: "man construction worker",
      image: "\uD83D\uDC77‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F477 U+200D U+2640 U+FE0F",
      name: "woman construction worker",
      image: "\uD83D\uDC77‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1FAC5",
      name: "person with crown",
      image: "\uD83E\uDEC5",
      category: "People & Body"
    },
    {
      code: "U+1F934",
      name: "prince",
      image: "\uD83E\uDD34",
      category: "People & Body"
    },
    {
      code: "U+1F478",
      name: "princess",
      image: "\uD83D\uDC78",
      category: "People & Body"
    },
    {
      code: "U+1F473",
      name: "person wearing turban",
      image: "\uD83D\uDC73",
      category: "People & Body"
    },
    {
      code: "U+1F473 U+200D U+2642 U+FE0F",
      name: "man wearing turban",
      image: "\uD83D\uDC73‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F473 U+200D U+2640 U+FE0F",
      name: "woman wearing turban",
      image: "\uD83D\uDC73‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F472",
      name: "person with skullcap",
      image: "\uD83D\uDC72",
      category: "People & Body"
    },
    {
      code: "U+1F9D5",
      name: "woman with headscarf",
      image: "\uD83E\uDDD5",
      category: "People & Body"
    },
    {
      code: "U+1F935",
      name: "person in tuxedo",
      image: "\uD83E\uDD35",
      category: "People & Body"
    },
    {
      code: "U+1F935 U+200D U+2642 U+FE0F",
      name: "man in tuxedo",
      image: "\uD83E\uDD35‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F935 U+200D U+2640 U+FE0F",
      name: "woman in tuxedo",
      image: "\uD83E\uDD35‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F470",
      name: "person with veil",
      image: "\uD83D\uDC70",
      category: "People & Body"
    },
    {
      code: "U+1F470 U+200D U+2642 U+FE0F",
      name: "man with veil",
      image: "\uD83D\uDC70‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F470 U+200D U+2640 U+FE0F",
      name: "woman with veil",
      image: "\uD83D\uDC70‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F930",
      name: "pregnant woman",
      image: "\uD83E\uDD30",
      category: "People & Body"
    },
    {
      code: "U+1FAC3",
      name: "pregnant man",
      image: "\uD83E\uDEC3",
      category: "People & Body"
    },
    {
      code: "U+1FAC4",
      name: "pregnant person",
      image: "\uD83E\uDEC4",
      category: "People & Body"
    },
    {
      code: "U+1F931",
      name: "breast-feeding",
      image: "\uD83E\uDD31",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F37C",
      name: "woman feeding baby",
      image: "\uD83D\uDC69‍\uD83C\uDF7C",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F37C",
      name: "man feeding baby",
      image: "\uD83D\uDC68‍\uD83C\uDF7C",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F37C",
      name: "person feeding baby",
      image: "\uD83E\uDDD1‍\uD83C\uDF7C",
      category: "People & Body"
    },
    {
      code: "U+1F47C",
      name: "baby angel",
      image: "\uD83D\uDC7C",
      category: "People & Body"
    },
    {
      code: "U+1F385",
      name: "Santa Claus",
      image: "\uD83C\uDF85",
      category: "People & Body"
    },
    {
      code: "U+1F936",
      name: "Mrs. Claus",
      image: "\uD83E\uDD36",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F384",
      name: "mx claus",
      image: "\uD83E\uDDD1‍\uD83C\uDF84",
      category: "People & Body"
    },
    {
      code: "U+1F9B8",
      name: "superhero",
      image: "\uD83E\uDDB8",
      category: "People & Body"
    },
    {
      code: "U+1F9B8 U+200D U+2642 U+FE0F",
      name: "man superhero",
      image: "\uD83E\uDDB8‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9B8 U+200D U+2640 U+FE0F",
      name: "woman superhero",
      image: "\uD83E\uDDB8‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9B9",
      name: "supervillain",
      image: "\uD83E\uDDB9",
      category: "People & Body"
    },
    {
      code: "U+1F9B9 U+200D U+2642 U+FE0F",
      name: "man supervillain",
      image: "\uD83E\uDDB9‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9B9 U+200D U+2640 U+FE0F",
      name: "woman supervillain",
      image: "\uD83E\uDDB9‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9D9",
      name: "mage",
      image: "\uD83E\uDDD9",
      category: "People & Body"
    },
    {
      code: "U+1F9D9 U+200D U+2642 U+FE0F",
      name: "man mage",
      image: "\uD83E\uDDD9‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9D9 U+200D U+2640 U+FE0F",
      name: "woman mage",
      image: "\uD83E\uDDD9‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9DA",
      name: "fairy",
      image: "\uD83E\uDDDA",
      category: "People & Body"
    },
    {
      code: "U+1F9DA U+200D U+2642 U+FE0F",
      name: "man fairy",
      image: "\uD83E\uDDDA‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9DA U+200D U+2640 U+FE0F",
      name: "woman fairy",
      image: "\uD83E\uDDDA‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9DB",
      name: "vampire",
      image: "\uD83E\uDDDB",
      category: "People & Body"
    },
    {
      code: "U+1F9DB U+200D U+2642 U+FE0F",
      name: "man vampire",
      image: "\uD83E\uDDDB‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9DB U+200D U+2640 U+FE0F",
      name: "woman vampire",
      image: "\uD83E\uDDDB‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9DC",
      name: "merperson",
      image: "\uD83E\uDDDC",
      category: "People & Body"
    },
    {
      code: "U+1F9DC U+200D U+2642 U+FE0F",
      name: "merman",
      image: "\uD83E\uDDDC‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9DC U+200D U+2640 U+FE0F",
      name: "mermaid",
      image: "\uD83E\uDDDC‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9DD",
      name: "elf",
      image: "\uD83E\uDDDD",
      category: "People & Body"
    },
    {
      code: "U+1F9DD U+200D U+2642 U+FE0F",
      name: "man elf",
      image: "\uD83E\uDDDD‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9DD U+200D U+2640 U+FE0F",
      name: "woman elf",
      image: "\uD83E\uDDDD‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9DE",
      name: "genie",
      image: "\uD83E\uDDDE",
      category: "People & Body"
    },
    {
      code: "U+1F9DE U+200D U+2642 U+FE0F",
      name: "man genie",
      image: "\uD83E\uDDDE‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9DE U+200D U+2640 U+FE0F",
      name: "woman genie",
      image: "\uD83E\uDDDE‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9DF",
      name: "zombie",
      image: "\uD83E\uDDDF",
      category: "People & Body"
    },
    {
      code: "U+1F9DF U+200D U+2642 U+FE0F",
      name: "man zombie",
      image: "\uD83E\uDDDF‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9DF U+200D U+2640 U+FE0F",
      name: "woman zombie",
      image: "\uD83E\uDDDF‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9CC",
      name: "troll",
      image: "\uD83E\uDDCC",
      category: "People & Body"
    },
    {
      code: "U+1F486",
      name: "person getting massage",
      image: "\uD83D\uDC86",
      category: "People & Body"
    },
    {
      code: "U+1F486 U+200D U+2642 U+FE0F",
      name: "man getting massage",
      image: "\uD83D\uDC86‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F486 U+200D U+2640 U+FE0F",
      name: "woman getting massage",
      image: "\uD83D\uDC86‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F487",
      name: "person getting haircut",
      image: "\uD83D\uDC87",
      category: "People & Body"
    },
    {
      code: "U+1F487 U+200D U+2642 U+FE0F",
      name: "man getting haircut",
      image: "\uD83D\uDC87‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F487 U+200D U+2640 U+FE0F",
      name: "woman getting haircut",
      image: "\uD83D\uDC87‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F6B6",
      name: "person walking",
      image: "\uD83D\uDEB6",
      category: "People & Body"
    },
    {
      code: "U+1F6B6 U+200D U+2642 U+FE0F",
      name: "man walking",
      image: "\uD83D\uDEB6‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F6B6 U+200D U+2640 U+FE0F",
      name: "woman walking",
      image: "\uD83D\uDEB6‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9CD",
      name: "person standing",
      image: "\uD83E\uDDCD",
      category: "People & Body"
    },
    {
      code: "U+1F9CD U+200D U+2642 U+FE0F",
      name: "man standing",
      image: "\uD83E\uDDCD‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9CD U+200D U+2640 U+FE0F",
      name: "woman standing",
      image: "\uD83E\uDDCD‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9CE",
      name: "person kneeling",
      image: "\uD83E\uDDCE",
      category: "People & Body"
    },
    {
      code: "U+1F9CE U+200D U+2642 U+FE0F",
      name: "man kneeling",
      image: "\uD83E\uDDCE‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9CE U+200D U+2640 U+FE0F",
      name: "woman kneeling",
      image: "\uD83E\uDDCE‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9AF",
      name: "person with white cane",
      image: "\uD83E\uDDD1‍\uD83E\uDDAF",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9AF",
      name: "man with white cane",
      image: "\uD83D\uDC68‍\uD83E\uDDAF",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9AF",
      name: "woman with white cane",
      image: "\uD83D\uDC69‍\uD83E\uDDAF",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9BC",
      name: "person in motorized wheelchair",
      image: "\uD83E\uDDD1‍\uD83E\uDDBC",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9BC",
      name: "man in motorized wheelchair",
      image: "\uD83D\uDC68‍\uD83E\uDDBC",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9BC",
      name: "woman in motorized wheelchair",
      image: "\uD83D\uDC69‍\uD83E\uDDBC",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9BD",
      name: "person in manual wheelchair",
      image: "\uD83E\uDDD1‍\uD83E\uDDBD",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9BD",
      name: "man in manual wheelchair",
      image: "\uD83D\uDC68‍\uD83E\uDDBD",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9BD",
      name: "woman in manual wheelchair",
      image: "\uD83D\uDC69‍\uD83E\uDDBD",
      category: "People & Body"
    },
    {
      code: "U+1F3C3",
      name: "person running",
      image: "\uD83C\uDFC3",
      category: "People & Body"
    },
    {
      code: "U+1F3C3 U+200D U+2642 U+FE0F",
      name: "man running",
      image: "\uD83C\uDFC3‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F3C3 U+200D U+2640 U+FE0F",
      name: "woman running",
      image: "\uD83C\uDFC3‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F483",
      name: "woman dancing",
      image: "\uD83D\uDC83",
      category: "People & Body"
    },
    {
      code: "U+1F57A",
      name: "man dancing",
      image: "\uD83D\uDD7A",
      category: "People & Body"
    },
    {
      code: "U+1F574",
      name: "person in suit levitating",
      image: "\uD83D\uDD74",
      category: "People & Body"
    },
    {
      code: "U+1F46F",
      name: "people with bunny ears",
      image: "\uD83D\uDC6F",
      category: "People & Body"
    },
    {
      code: "U+1F46F U+200D U+2642 U+FE0F",
      name: "men with bunny ears",
      image: "\uD83D\uDC6F‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F46F U+200D U+2640 U+FE0F",
      name: "women with bunny ears",
      image: "\uD83D\uDC6F‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9D6",
      name: "person in steamy room",
      image: "\uD83E\uDDD6",
      category: "People & Body"
    },
    {
      code: "U+1F9D6 U+200D U+2642 U+FE0F",
      name: "man in steamy room",
      image: "\uD83E\uDDD6‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9D6 U+200D U+2640 U+FE0F",
      name: "woman in steamy room",
      image: "\uD83E\uDDD6‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9D7",
      name: "person climbing",
      image: "\uD83E\uDDD7",
      category: "People & Body"
    },
    {
      code: "U+1F9D7 U+200D U+2642 U+FE0F",
      name: "man climbing",
      image: "\uD83E\uDDD7‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9D7 U+200D U+2640 U+FE0F",
      name: "woman climbing",
      image: "\uD83E\uDDD7‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F93A",
      name: "person fencing",
      image: "\uD83E\uDD3A",
      category: "People & Body"
    },
    {
      code: "U+1F3C7",
      name: "horse racing",
      image: "\uD83C\uDFC7",
      category: "People & Body"
    },
    {
      code: "U+26F7",
      name: "skier",
      image: "⛷",
      category: "People & Body"
    },
    {
      code: "U+1F3C2",
      name: "snowboarder",
      image: "\uD83C\uDFC2",
      category: "People & Body"
    },
    {
      code: "U+1F3CC",
      name: "person golfing",
      image: "\uD83C\uDFCC",
      category: "People & Body"
    },
    {
      code: "U+1F3CC U+FE0F U+200D U+2642 U+FE0F",
      name: "man golfing",
      image: "\uD83C\uDFCC️‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F3CC U+FE0F U+200D U+2640 U+FE0F",
      name: "woman golfing",
      image: "\uD83C\uDFCC️‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F3C4",
      name: "person surfing",
      image: "\uD83C\uDFC4",
      category: "People & Body"
    },
    {
      code: "U+1F3C4 U+200D U+2642 U+FE0F",
      name: "man surfing",
      image: "\uD83C\uDFC4‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F3C4 U+200D U+2640 U+FE0F",
      name: "woman surfing",
      image: "\uD83C\uDFC4‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F6A3",
      name: "person rowing boat",
      image: "\uD83D\uDEA3",
      category: "People & Body"
    },
    {
      code: "U+1F6A3 U+200D U+2642 U+FE0F",
      name: "man rowing boat",
      image: "\uD83D\uDEA3‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F6A3 U+200D U+2640 U+FE0F",
      name: "woman rowing boat",
      image: "\uD83D\uDEA3‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F3CA",
      name: "person swimming",
      image: "\uD83C\uDFCA",
      category: "People & Body"
    },
    {
      code: "U+1F3CA U+200D U+2642 U+FE0F",
      name: "man swimming",
      image: "\uD83C\uDFCA‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F3CA U+200D U+2640 U+FE0F",
      name: "woman swimming",
      image: "\uD83C\uDFCA‍♀️",
      category: "People & Body"
    },
    {
      code: "U+26F9",
      name: "person bouncing ball",
      image: "⛹",
      category: "People & Body"
    },
    {
      code: "U+26F9 U+FE0F U+200D U+2642 U+FE0F",
      name: "man bouncing ball",
      image: "⛹️‍♂️",
      category: "People & Body"
    },
    {
      code: "U+26F9 U+FE0F U+200D U+2640 U+FE0F",
      name: "woman bouncing ball",
      image: "⛹️‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F3CB",
      name: "person lifting weights",
      image: "\uD83C\uDFCB",
      category: "People & Body"
    },
    {
      code: "U+1F3CB U+FE0F U+200D U+2642 U+FE0F",
      name: "man lifting weights",
      image: "\uD83C\uDFCB️‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F3CB U+FE0F U+200D U+2640 U+FE0F",
      name: "woman lifting weights",
      image: "\uD83C\uDFCB️‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F6B4",
      name: "person biking",
      image: "\uD83D\uDEB4",
      category: "People & Body"
    },
    {
      code: "U+1F6B4 U+200D U+2642 U+FE0F",
      name: "man biking",
      image: "\uD83D\uDEB4‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F6B4 U+200D U+2640 U+FE0F",
      name: "woman biking",
      image: "\uD83D\uDEB4‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F6B5",
      name: "person mountain biking",
      image: "\uD83D\uDEB5",
      category: "People & Body"
    },
    {
      code: "U+1F6B5 U+200D U+2642 U+FE0F",
      name: "man mountain biking",
      image: "\uD83D\uDEB5‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F6B5 U+200D U+2640 U+FE0F",
      name: "woman mountain biking",
      image: "\uD83D\uDEB5‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F938",
      name: "person cartwheeling",
      image: "\uD83E\uDD38",
      category: "People & Body"
    },
    {
      code: "U+1F938 U+200D U+2642 U+FE0F",
      name: "man cartwheeling",
      image: "\uD83E\uDD38‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F938 U+200D U+2640 U+FE0F",
      name: "woman cartwheeling",
      image: "\uD83E\uDD38‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F93C",
      name: "people wrestling",
      image: "\uD83E\uDD3C",
      category: "People & Body"
    },
    {
      code: "U+1F93C U+200D U+2642 U+FE0F",
      name: "men wrestling",
      image: "\uD83E\uDD3C‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F93C U+200D U+2640 U+FE0F",
      name: "women wrestling",
      image: "\uD83E\uDD3C‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F93D",
      name: "person playing water polo",
      image: "\uD83E\uDD3D",
      category: "People & Body"
    },
    {
      code: "U+1F93D U+200D U+2642 U+FE0F",
      name: "man playing water polo",
      image: "\uD83E\uDD3D‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F93D U+200D U+2640 U+FE0F",
      name: "woman playing water polo",
      image: "\uD83E\uDD3D‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F93E",
      name: "person playing handball",
      image: "\uD83E\uDD3E",
      category: "People & Body"
    },
    {
      code: "U+1F93E U+200D U+2642 U+FE0F",
      name: "man playing handball",
      image: "\uD83E\uDD3E‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F93E U+200D U+2640 U+FE0F",
      name: "woman playing handball",
      image: "\uD83E\uDD3E‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F939",
      name: "person juggling",
      image: "\uD83E\uDD39",
      category: "People & Body"
    },
    {
      code: "U+1F939 U+200D U+2642 U+FE0F",
      name: "man juggling",
      image: "\uD83E\uDD39‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F939 U+200D U+2640 U+FE0F",
      name: "woman juggling",
      image: "\uD83E\uDD39‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9D8",
      name: "person in lotus position",
      image: "\uD83E\uDDD8",
      category: "People & Body"
    },
    {
      code: "U+1F9D8 U+200D U+2642 U+FE0F",
      name: "man in lotus position",
      image: "\uD83E\uDDD8‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9D8 U+200D U+2640 U+FE0F",
      name: "woman in lotus position",
      image: "\uD83E\uDDD8‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F6C0",
      name: "person taking bath",
      image: "\uD83D\uDEC0",
      category: "People & Body"
    },
    {
      code: "U+1F6CC",
      name: "person in bed",
      image: "\uD83D\uDECC",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F91D U+200D U+1F9D1",
      name: "people holding hands",
      image: "\uD83E\uDDD1‍\uD83E\uDD1D‍\uD83E\uDDD1",
      category: "People & Body"
    },
    {
      code: "U+1F46D",
      name: "women holding hands",
      image: "\uD83D\uDC6D",
      category: "People & Body"
    },
    {
      code: "U+1F46B",
      name: "woman and man holding hands",
      image: "\uD83D\uDC6B",
      category: "People & Body"
    },
    {
      code: "U+1F46C",
      name: "men holding hands",
      image: "\uD83D\uDC6C",
      category: "People & Body"
    },
    {
      code: "U+1F48F",
      name: "kiss",
      image: "\uD83D\uDC8F",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2764 U+FE0F U+200D U+1F48B U+200D U+1F468",
      name: "kiss: woman, man",
      image: "\uD83D\uDC69‍❤️‍\uD83D\uDC8B‍\uD83D\uDC68",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+2764 U+FE0F U+200D U+1F48B U+200D U+1F468",
      name: "kiss: man, man",
      image: "\uD83D\uDC68‍❤️‍\uD83D\uDC8B‍\uD83D\uDC68",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2764 U+FE0F U+200D U+1F48B U+200D U+1F469",
      name: "kiss: woman, woman",
      image: "\uD83D\uDC69‍❤️‍\uD83D\uDC8B‍\uD83D\uDC69",
      category: "People & Body"
    },
    {
      code: "U+1F491",
      name: "couple with heart",
      image: "\uD83D\uDC91",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2764 U+FE0F U+200D U+1F468",
      name: "couple with heart: woman, man",
      image: "\uD83D\uDC69‍❤️‍\uD83D\uDC68",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+2764 U+FE0F U+200D U+1F468",
      name: "couple with heart: man, man",
      image: "\uD83D\uDC68‍❤️‍\uD83D\uDC68",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2764 U+FE0F U+200D U+1F469",
      name: "couple with heart: woman, woman",
      image: "\uD83D\uDC69‍❤️‍\uD83D\uDC69",
      category: "People & Body"
    },
    {
      code: "U+1F46A",
      name: "family",
      image: "\uD83D\uDC6A",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F469 U+200D U+1F466",
      name: "family: man, woman, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F469 U+200D U+1F467",
      name: "family: man, woman, girl",
      image: "\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F469 U+200D U+1F467 U+200D U+1F466",
      name: "family: man, woman, girl, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F469 U+200D U+1F466 U+200D U+1F466",
      name: "family: man, woman, boy, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC66‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F469 U+200D U+1F467 U+200D U+1F467",
      name: "family: man, woman, girl, girl",
      image: "\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F468 U+200D U+1F466",
      name: "family: man, man, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC68‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F468 U+200D U+1F467",
      name: "family: man, man, girl",
      image: "\uD83D\uDC68‍\uD83D\uDC68‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F468 U+200D U+1F467 U+200D U+1F466",
      name: "family: man, man, girl, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC68‍\uD83D\uDC67‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F468 U+200D U+1F466 U+200D U+1F466",
      name: "family: man, man, boy, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC68‍\uD83D\uDC66‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F468 U+200D U+1F467 U+200D U+1F467",
      name: "family: man, man, girl, girl",
      image: "\uD83D\uDC68‍\uD83D\uDC68‍\uD83D\uDC67‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F469 U+200D U+1F466",
      name: "family: woman, woman, boy",
      image: "\uD83D\uDC69‍\uD83D\uDC69‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F469 U+200D U+1F467",
      name: "family: woman, woman, girl",
      image: "\uD83D\uDC69‍\uD83D\uDC69‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F469 U+200D U+1F467 U+200D U+1F466",
      name: "family: woman, woman, girl, boy",
      image: "\uD83D\uDC69‍\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F469 U+200D U+1F466 U+200D U+1F466",
      name: "family: woman, woman, boy, boy",
      image: "\uD83D\uDC69‍\uD83D\uDC69‍\uD83D\uDC66‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F469 U+200D U+1F467 U+200D U+1F467",
      name: "family: woman, woman, girl, girl",
      image: "\uD83D\uDC69‍\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F466",
      name: "family: man, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F466 U+200D U+1F466",
      name: "family: man, boy, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC66‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F467",
      name: "family: man, girl",
      image: "\uD83D\uDC68‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F467 U+200D U+1F466",
      name: "family: man, girl, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC67‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F467 U+200D U+1F467",
      name: "family: man, girl, girl",
      image: "\uD83D\uDC68‍\uD83D\uDC67‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F466",
      name: "family: woman, boy",
      image: "\uD83D\uDC69‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F466 U+200D U+1F466",
      name: "family: woman, boy, boy",
      image: "\uD83D\uDC69‍\uD83D\uDC66‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F467",
      name: "family: woman, girl",
      image: "\uD83D\uDC69‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F467 U+200D U+1F466",
      name: "family: woman, girl, boy",
      image: "\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F467 U+200D U+1F467",
      name: "family: woman, girl, girl",
      image: "\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F5E3",
      name: "speaking head",
      image: "\uD83D\uDDE3",
      category: "People & Body"
    },
    {
      code: "U+1F464",
      name: "bust in silhouette",
      image: "\uD83D\uDC64",
      category: "People & Body"
    },
    {
      code: "U+1F465",
      name: "busts in silhouette",
      image: "\uD83D\uDC65",
      category: "People & Body"
    },
    {
      code: "U+1FAC2",
      name: "people hugging",
      image: "\uD83E\uDEC2",
      category: "People & Body"
    },
    {
      code: "U+1F463",
      name: "footprints",
      image: "\uD83D\uDC63",
      category: "People & Body"
    },
    {
      code: "U+1F9B0",
      name: "red hair",
      image: "\uD83E\uDDB0",
      category: "People & Body"
    },
    {
      code: "U+1F9B1",
      name: "curly hair",
      image: "\uD83E\uDDB1",
      category: "People & Body"
    },
    {
      code: "U+1F9B3",
      name: "white hair",
      image: "\uD83E\uDDB3",
      category: "People & Body"
    },
    {
      code: "U+1F9B2",
      name: "bald",
      image: "\uD83E\uDDB2",
      category: "People & Body"
    },
    {
      code: "U+1F435",
      name: "monkey face",
      image: "\uD83D\uDC35",
      category: "Animals & Nature"
    },
    {
      code: "U+1F412",
      name: "monkey",
      image: "\uD83D\uDC12",
      category: "Animals & Nature"
    },
    {
      code: "U+1F98D",
      name: "gorilla",
      image: "\uD83E\uDD8D",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A7",
      name: "orangutan",
      image: "\uD83E\uDDA7",
      category: "Animals & Nature"
    },
    {
      code: "U+1F436",
      name: "dog face",
      image: "\uD83D\uDC36",
      category: "Animals & Nature"
    },
    {
      code: "U+1F415",
      name: "dog",
      image: "\uD83D\uDC15",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9AE",
      name: "guide dog",
      image: "\uD83E\uDDAE",
      category: "Animals & Nature"
    },
    {
      code: "U+1F415 U+200D U+1F9BA",
      name: "service dog",
      image: "\uD83D\uDC15‍\uD83E\uDDBA",
      category: "Animals & Nature"
    },
    {
      code: "U+1F429",
      name: "poodle",
      image: "\uD83D\uDC29",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43A",
      name: "wolf",
      image: "\uD83D\uDC3A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F98A",
      name: "fox",
      image: "\uD83E\uDD8A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F99D",
      name: "raccoon",
      image: "\uD83E\uDD9D",
      category: "Animals & Nature"
    },
    {
      code: "U+1F431",
      name: "cat face",
      image: "\uD83D\uDC31",
      category: "Animals & Nature"
    },
    {
      code: "U+1F408",
      name: "cat",
      image: "\uD83D\uDC08",
      category: "Animals & Nature"
    },
    {
      code: "U+1F408 U+200D U+2B1B",
      name: "black cat",
      image: "\uD83D\uDC08‍⬛",
      category: "Animals & Nature"
    },
    {
      code: "U+1F981",
      name: "lion",
      image: "\uD83E\uDD81",
      category: "Animals & Nature"
    },
    {
      code: "U+1F42F",
      name: "tiger face",
      image: "\uD83D\uDC2F",
      category: "Animals & Nature"
    },
    {
      code: "U+1F405",
      name: "tiger",
      image: "\uD83D\uDC05",
      category: "Animals & Nature"
    },
    {
      code: "U+1F406",
      name: "leopard",
      image: "\uD83D\uDC06",
      category: "Animals & Nature"
    },
    {
      code: "U+1F434",
      name: "horse face",
      image: "\uD83D\uDC34",
      category: "Animals & Nature"
    },
    {
      code: "U+1F40E",
      name: "horse",
      image: "\uD83D\uDC0E",
      category: "Animals & Nature"
    },
    {
      code: "U+1F984",
      name: "unicorn",
      image: "\uD83E\uDD84",
      category: "Animals & Nature"
    },
    {
      code: "U+1F993",
      name: "zebra",
      image: "\uD83E\uDD93",
      category: "Animals & Nature"
    },
    {
      code: "U+1F98C",
      name: "deer",
      image: "\uD83E\uDD8C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9AC",
      name: "bison",
      image: "\uD83E\uDDAC",
      category: "Animals & Nature"
    },
    {
      code: "U+1F42E",
      name: "cow face",
      image: "\uD83D\uDC2E",
      category: "Animals & Nature"
    },
    {
      code: "U+1F402",
      name: "ox",
      image: "\uD83D\uDC02",
      category: "Animals & Nature"
    },
    {
      code: "U+1F403",
      name: "water buffalo",
      image: "\uD83D\uDC03",
      category: "Animals & Nature"
    },
    {
      code: "U+1F404",
      name: "cow",
      image: "\uD83D\uDC04",
      category: "Animals & Nature"
    },
    {
      code: "U+1F437",
      name: "pig face",
      image: "\uD83D\uDC37",
      category: "Animals & Nature"
    },
    {
      code: "U+1F416",
      name: "pig",
      image: "\uD83D\uDC16",
      category: "Animals & Nature"
    },
    {
      code: "U+1F417",
      name: "boar",
      image: "\uD83D\uDC17",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43D",
      name: "pig nose",
      image: "\uD83D\uDC3D",
      category: "Animals & Nature"
    },
    {
      code: "U+1F40F",
      name: "ram",
      image: "\uD83D\uDC0F",
      category: "Animals & Nature"
    },
    {
      code: "U+1F411",
      name: "ewe",
      image: "\uD83D\uDC11",
      category: "Animals & Nature"
    },
    {
      code: "U+1F410",
      name: "goat",
      image: "\uD83D\uDC10",
      category: "Animals & Nature"
    },
    {
      code: "U+1F42A",
      name: "camel",
      image: "\uD83D\uDC2A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F42B",
      name: "two-hump camel",
      image: "\uD83D\uDC2B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F999",
      name: "llama",
      image: "\uD83E\uDD99",
      category: "Animals & Nature"
    },
    {
      code: "U+1F992",
      name: "giraffe",
      image: "\uD83E\uDD92",
      category: "Animals & Nature"
    },
    {
      code: "U+1F418",
      name: "elephant",
      image: "\uD83D\uDC18",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A3",
      name: "mammoth",
      image: "\uD83E\uDDA3",
      category: "Animals & Nature"
    },
    {
      code: "U+1F98F",
      name: "rhinoceros",
      image: "\uD83E\uDD8F",
      category: "Animals & Nature"
    },
    {
      code: "U+1F99B",
      name: "hippopotamus",
      image: "\uD83E\uDD9B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F42D",
      name: "mouse face",
      image: "\uD83D\uDC2D",
      category: "Animals & Nature"
    },
    {
      code: "U+1F401",
      name: "mouse",
      image: "\uD83D\uDC01",
      category: "Animals & Nature"
    },
    {
      code: "U+1F400",
      name: "rat",
      image: "\uD83D\uDC00",
      category: "Animals & Nature"
    },
    {
      code: "U+1F439",
      name: "hamster",
      image: "\uD83D\uDC39",
      category: "Animals & Nature"
    },
    {
      code: "U+1F430",
      name: "rabbit face",
      image: "\uD83D\uDC30",
      category: "Animals & Nature"
    },
    {
      code: "U+1F407",
      name: "rabbit",
      image: "\uD83D\uDC07",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43F",
      name: "chipmunk",
      image: "\uD83D\uDC3F",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9AB",
      name: "beaver",
      image: "\uD83E\uDDAB",
      category: "Animals & Nature"
    },
    {
      code: "U+1F994",
      name: "hedgehog",
      image: "\uD83E\uDD94",
      category: "Animals & Nature"
    },
    {
      code: "U+1F987",
      name: "bat",
      image: "\uD83E\uDD87",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43B",
      name: "bear",
      image: "\uD83D\uDC3B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43B U+200D U+2744 U+FE0F",
      name: "polar bear",
      image: "\uD83D\uDC3B‍❄️",
      category: "Animals & Nature"
    },
    {
      code: "U+1F428",
      name: "koala",
      image: "\uD83D\uDC28",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43C",
      name: "panda",
      image: "\uD83D\uDC3C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A5",
      name: "sloth",
      image: "\uD83E\uDDA5",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A6",
      name: "otter",
      image: "\uD83E\uDDA6",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A8",
      name: "skunk",
      image: "\uD83E\uDDA8",
      category: "Animals & Nature"
    },
    {
      code: "U+1F998",
      name: "kangaroo",
      image: "\uD83E\uDD98",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A1",
      name: "badger",
      image: "\uD83E\uDDA1",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43E",
      name: "paw prints",
      image: "\uD83D\uDC3E",
      category: "Animals & Nature"
    },
    {
      code: "U+1F983",
      name: "turkey",
      image: "\uD83E\uDD83",
      category: "Animals & Nature"
    },
    {
      code: "U+1F414",
      name: "chicken",
      image: "\uD83D\uDC14",
      category: "Animals & Nature"
    },
    {
      code: "U+1F413",
      name: "rooster",
      image: "\uD83D\uDC13",
      category: "Animals & Nature"
    },
    {
      code: "U+1F423",
      name: "hatching chick",
      image: "\uD83D\uDC23",
      category: "Animals & Nature"
    },
    {
      code: "U+1F424",
      name: "baby chick",
      image: "\uD83D\uDC24",
      category: "Animals & Nature"
    },
    {
      code: "U+1F425",
      name: "front-facing baby chick",
      image: "\uD83D\uDC25",
      category: "Animals & Nature"
    },
    {
      code: "U+1F426",
      name: "bird",
      image: "\uD83D\uDC26",
      category: "Animals & Nature"
    },
    {
      code: "U+1F427",
      name: "penguin",
      image: "\uD83D\uDC27",
      category: "Animals & Nature"
    },
    {
      code: "U+1F54A",
      name: "dove",
      image: "\uD83D\uDD4A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F985",
      name: "eagle",
      image: "\uD83E\uDD85",
      category: "Animals & Nature"
    },
    {
      code: "U+1F986",
      name: "duck",
      image: "\uD83E\uDD86",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A2",
      name: "swan",
      image: "\uD83E\uDDA2",
      category: "Animals & Nature"
    },
    {
      code: "U+1F989",
      name: "owl",
      image: "\uD83E\uDD89",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A4",
      name: "dodo",
      image: "\uD83E\uDDA4",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB6",
      name: "feather",
      image: "\uD83E\uDEB6",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A9",
      name: "flamingo",
      image: "\uD83E\uDDA9",
      category: "Animals & Nature"
    },
    {
      code: "U+1F99A",
      name: "peacock",
      image: "\uD83E\uDD9A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F99C",
      name: "parrot",
      image: "\uD83E\uDD9C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F438",
      name: "frog",
      image: "\uD83D\uDC38",
      category: "Animals & Nature"
    },
    {
      code: "U+1F40A",
      name: "crocodile",
      image: "\uD83D\uDC0A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F422",
      name: "turtle",
      image: "\uD83D\uDC22",
      category: "Animals & Nature"
    },
    {
      code: "U+1F98E",
      name: "lizard",
      image: "\uD83E\uDD8E",
      category: "Animals & Nature"
    },
    {
      code: "U+1F40D",
      name: "snake",
      image: "\uD83D\uDC0D",
      category: "Animals & Nature"
    },
    {
      code: "U+1F432",
      name: "dragon face",
      image: "\uD83D\uDC32",
      category: "Animals & Nature"
    },
    {
      code: "U+1F409",
      name: "dragon",
      image: "\uD83D\uDC09",
      category: "Animals & Nature"
    },
    {
      code: "U+1F995",
      name: "sauropod",
      image: "\uD83E\uDD95",
      category: "Animals & Nature"
    },
    {
      code: "U+1F996",
      name: "T-Rex",
      image: "\uD83E\uDD96",
      category: "Animals & Nature"
    },
    {
      code: "U+1F433",
      name: "spouting whale",
      image: "\uD83D\uDC33",
      category: "Animals & Nature"
    },
    {
      code: "U+1F40B",
      name: "whale",
      image: "\uD83D\uDC0B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F42C",
      name: "dolphin",
      image: "\uD83D\uDC2C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9AD",
      name: "seal",
      image: "\uD83E\uDDAD",
      category: "Animals & Nature"
    },
    {
      code: "U+1F41F",
      name: "fish",
      image: "\uD83D\uDC1F",
      category: "Animals & Nature"
    },
    {
      code: "U+1F420",
      name: "tropical fish",
      image: "\uD83D\uDC20",
      category: "Animals & Nature"
    },
    {
      code: "U+1F421",
      name: "blowfish",
      image: "\uD83D\uDC21",
      category: "Animals & Nature"
    },
    {
      code: "U+1F988",
      name: "shark",
      image: "\uD83E\uDD88",
      category: "Animals & Nature"
    },
    {
      code: "U+1F419",
      name: "octopus",
      image: "\uD83D\uDC19",
      category: "Animals & Nature"
    },
    {
      code: "U+1F41A",
      name: "spiral shell",
      image: "\uD83D\uDC1A",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB8",
      name: "coral",
      image: "\uD83E\uDEB8",
      category: "Animals & Nature"
    },
    {
      code: "U+1F40C",
      name: "snail",
      image: "\uD83D\uDC0C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F98B",
      name: "butterfly",
      image: "\uD83E\uDD8B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F41B",
      name: "bug",
      image: "\uD83D\uDC1B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F41C",
      name: "ant",
      image: "\uD83D\uDC1C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F41D",
      name: "honeybee",
      image: "\uD83D\uDC1D",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB2",
      name: "beetle",
      image: "\uD83E\uDEB2",
      category: "Animals & Nature"
    },
    {
      code: "U+1F41E",
      name: "lady beetle",
      image: "\uD83D\uDC1E",
      category: "Animals & Nature"
    },
    {
      code: "U+1F997",
      name: "cricket",
      image: "\uD83E\uDD97",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB3",
      name: "cockroach",
      image: "\uD83E\uDEB3",
      category: "Animals & Nature"
    },
    {
      code: "U+1F577",
      name: "spider",
      image: "\uD83D\uDD77",
      category: "Animals & Nature"
    },
    {
      code: "U+1F578",
      name: "spider web",
      image: "\uD83D\uDD78",
      category: "Animals & Nature"
    },
    {
      code: "U+1F982",
      name: "scorpion",
      image: "\uD83E\uDD82",
      category: "Animals & Nature"
    },
    {
      code: "U+1F99F",
      name: "mosquito",
      image: "\uD83E\uDD9F",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB0",
      name: "fly",
      image: "\uD83E\uDEB0",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB1",
      name: "worm",
      image: "\uD83E\uDEB1",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A0",
      name: "microbe",
      image: "\uD83E\uDDA0",
      category: "Animals & Nature"
    },
    {
      code: "U+1F490",
      name: "bouquet",
      image: "\uD83D\uDC90",
      category: "Animals & Nature"
    },
    {
      code: "U+1F338",
      name: "cherry blossom",
      image: "\uD83C\uDF38",
      category: "Animals & Nature"
    },
    {
      code: "U+1F4AE",
      name: "white flower",
      image: "\uD83D\uDCAE",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB7",
      name: "lotus",
      image: "\uD83E\uDEB7",
      category: "Animals & Nature"
    },
    {
      code: "U+1F3F5",
      name: "rosette",
      image: "\uD83C\uDFF5",
      category: "Animals & Nature"
    },
    {
      code: "U+1F339",
      name: "rose",
      image: "\uD83C\uDF39",
      category: "Animals & Nature"
    },
    {
      code: "U+1F940",
      name: "wilted flower",
      image: "\uD83E\uDD40",
      category: "Animals & Nature"
    },
    {
      code: "U+1F33A",
      name: "hibiscus",
      image: "\uD83C\uDF3A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F33B",
      name: "sunflower",
      image: "\uD83C\uDF3B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F33C",
      name: "blossom",
      image: "\uD83C\uDF3C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F337",
      name: "tulip",
      image: "\uD83C\uDF37",
      category: "Animals & Nature"
    },
    {
      code: "U+1F331",
      name: "seedling",
      image: "\uD83C\uDF31",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB4",
      name: "potted plant",
      image: "\uD83E\uDEB4",
      category: "Animals & Nature"
    },
    {
      code: "U+1F332",
      name: "evergreen tree",
      image: "\uD83C\uDF32",
      category: "Animals & Nature"
    },
    {
      code: "U+1F333",
      name: "deciduous tree",
      image: "\uD83C\uDF33",
      category: "Animals & Nature"
    },
    {
      code: "U+1F334",
      name: "palm tree",
      image: "\uD83C\uDF34",
      category: "Animals & Nature"
    },
    {
      code: "U+1F335",
      name: "cactus",
      image: "\uD83C\uDF35",
      category: "Animals & Nature"
    },
    {
      code: "U+1F33E",
      name: "sheaf of rice",
      image: "\uD83C\uDF3E",
      category: "Animals & Nature"
    },
    {
      code: "U+1F33F",
      name: "herb",
      image: "\uD83C\uDF3F",
      category: "Animals & Nature"
    },
    {
      code: "U+2618",
      name: "shamrock",
      image: "☘",
      category: "Animals & Nature"
    },
    {
      code: "U+1F340",
      name: "four leaf clover",
      image: "\uD83C\uDF40",
      category: "Animals & Nature"
    },
    {
      code: "U+1F341",
      name: "maple leaf",
      image: "\uD83C\uDF41",
      category: "Animals & Nature"
    },
    {
      code: "U+1F342",
      name: "fallen leaf",
      image: "\uD83C\uDF42",
      category: "Animals & Nature"
    },
    {
      code: "U+1F343",
      name: "leaf fluttering in wind",
      image: "\uD83C\uDF43",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB9",
      name: "empty nest",
      image: "\uD83E\uDEB9",
      category: "Animals & Nature"
    },
    {
      code: "U+1FABA",
      name: "nest with eggs",
      image: "\uD83E\uDEBA",
      category: "Animals & Nature"
    },
    {
      code: "U+1F344",
      name: "mushroom",
      image: "\uD83C\uDF44",
      category: "Animals & Nature"
    },
    {
      code: "U+1F347",
      name: "grapes",
      image: "\uD83C\uDF47",
      category: "Food & Drink"
    },
    {
      code: "U+1F348",
      name: "melon",
      image: "\uD83C\uDF48",
      category: "Food & Drink"
    },
    {
      code: "U+1F349",
      name: "watermelon",
      image: "\uD83C\uDF49",
      category: "Food & Drink"
    },
    {
      code: "U+1F34A",
      name: "tangerine",
      image: "\uD83C\uDF4A",
      category: "Food & Drink"
    },
    {
      code: "U+1F34B",
      name: "lemon",
      image: "\uD83C\uDF4B",
      category: "Food & Drink"
    },
    {
      code: "U+1F34C",
      name: "banana",
      image: "\uD83C\uDF4C",
      category: "Food & Drink"
    },
    {
      code: "U+1F34D",
      name: "pineapple",
      image: "\uD83C\uDF4D",
      category: "Food & Drink"
    },
    {
      code: "U+1F96D",
      name: "mango",
      image: "\uD83E\uDD6D",
      category: "Food & Drink"
    },
    {
      code: "U+1F34E",
      name: "red apple",
      image: "\uD83C\uDF4E",
      category: "Food & Drink"
    },
    {
      code: "U+1F34F",
      name: "green apple",
      image: "\uD83C\uDF4F",
      category: "Food & Drink"
    },
    {
      code: "U+1F350",
      name: "pear",
      image: "\uD83C\uDF50",
      category: "Food & Drink"
    },
    {
      code: "U+1F351",
      name: "peach",
      image: "\uD83C\uDF51",
      category: "Food & Drink"
    },
    {
      code: "U+1F352",
      name: "cherries",
      image: "\uD83C\uDF52",
      category: "Food & Drink"
    },
    {
      code: "U+1F353",
      name: "strawberry",
      image: "\uD83C\uDF53",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD0",
      name: "blueberries",
      image: "\uD83E\uDED0",
      category: "Food & Drink"
    },
    {
      code: "U+1F95D",
      name: "kiwi fruit",
      image: "\uD83E\uDD5D",
      category: "Food & Drink"
    },
    {
      code: "U+1F345",
      name: "tomato",
      image: "\uD83C\uDF45",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD2",
      name: "olive",
      image: "\uD83E\uDED2",
      category: "Food & Drink"
    },
    {
      code: "U+1F965",
      name: "coconut",
      image: "\uD83E\uDD65",
      category: "Food & Drink"
    },
    {
      code: "U+1F951",
      name: "avocado",
      image: "\uD83E\uDD51",
      category: "Food & Drink"
    },
    {
      code: "U+1F346",
      name: "eggplant",
      image: "\uD83C\uDF46",
      category: "Food & Drink"
    },
    {
      code: "U+1F954",
      name: "potato",
      image: "\uD83E\uDD54",
      category: "Food & Drink"
    },
    {
      code: "U+1F955",
      name: "carrot",
      image: "\uD83E\uDD55",
      category: "Food & Drink"
    },
    {
      code: "U+1F33D",
      name: "ear of corn",
      image: "\uD83C\uDF3D",
      category: "Food & Drink"
    },
    {
      code: "U+1F336",
      name: "hot pepper",
      image: "\uD83C\uDF36",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD1",
      name: "bell pepper",
      image: "\uD83E\uDED1",
      category: "Food & Drink"
    },
    {
      code: "U+1F952",
      name: "cucumber",
      image: "\uD83E\uDD52",
      category: "Food & Drink"
    },
    {
      code: "U+1F96C",
      name: "leafy green",
      image: "\uD83E\uDD6C",
      category: "Food & Drink"
    },
    {
      code: "U+1F966",
      name: "broccoli",
      image: "\uD83E\uDD66",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C4",
      name: "garlic",
      image: "\uD83E\uDDC4",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C5",
      name: "onion",
      image: "\uD83E\uDDC5",
      category: "Food & Drink"
    },
    {
      code: "U+1F95C",
      name: "peanuts",
      image: "\uD83E\uDD5C",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD8",
      name: "beans",
      image: "\uD83E\uDED8",
      category: "Food & Drink"
    },
    {
      code: "U+1F330",
      name: "chestnut",
      image: "\uD83C\uDF30",
      category: "Food & Drink"
    },
    {
      code: "U+1F35E",
      name: "bread",
      image: "\uD83C\uDF5E",
      category: "Food & Drink"
    },
    {
      code: "U+1F950",
      name: "croissant",
      image: "\uD83E\uDD50",
      category: "Food & Drink"
    },
    {
      code: "U+1F956",
      name: "baguette bread",
      image: "\uD83E\uDD56",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD3",
      name: "flatbread",
      image: "\uD83E\uDED3",
      category: "Food & Drink"
    },
    {
      code: "U+1F968",
      name: "pretzel",
      image: "\uD83E\uDD68",
      category: "Food & Drink"
    },
    {
      code: "U+1F96F",
      name: "bagel",
      image: "\uD83E\uDD6F",
      category: "Food & Drink"
    },
    {
      code: "U+1F95E",
      name: "pancakes",
      image: "\uD83E\uDD5E",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C7",
      name: "waffle",
      image: "\uD83E\uDDC7",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C0",
      name: "cheese wedge",
      image: "\uD83E\uDDC0",
      category: "Food & Drink"
    },
    {
      code: "U+1F356",
      name: "meat on bone",
      image: "\uD83C\uDF56",
      category: "Food & Drink"
    },
    {
      code: "U+1F357",
      name: "poultry leg",
      image: "\uD83C\uDF57",
      category: "Food & Drink"
    },
    {
      code: "U+1F969",
      name: "cut of meat",
      image: "\uD83E\uDD69",
      category: "Food & Drink"
    },
    {
      code: "U+1F953",
      name: "bacon",
      image: "\uD83E\uDD53",
      category: "Food & Drink"
    },
    {
      code: "U+1F354",
      name: "hamburger",
      image: "\uD83C\uDF54",
      category: "Food & Drink"
    },
    {
      code: "U+1F35F",
      name: "french fries",
      image: "\uD83C\uDF5F",
      category: "Food & Drink"
    },
    {
      code: "U+1F355",
      name: "pizza",
      image: "\uD83C\uDF55",
      category: "Food & Drink"
    },
    {
      code: "U+1F32D",
      name: "hot dog",
      image: "\uD83C\uDF2D",
      category: "Food & Drink"
    },
    {
      code: "U+1F96A",
      name: "sandwich",
      image: "\uD83E\uDD6A",
      category: "Food & Drink"
    },
    {
      code: "U+1F32E",
      name: "taco",
      image: "\uD83C\uDF2E",
      category: "Food & Drink"
    },
    {
      code: "U+1F32F",
      name: "burrito",
      image: "\uD83C\uDF2F",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD4",
      name: "tamale",
      image: "\uD83E\uDED4",
      category: "Food & Drink"
    },
    {
      code: "U+1F959",
      name: "stuffed flatbread",
      image: "\uD83E\uDD59",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C6",
      name: "falafel",
      image: "\uD83E\uDDC6",
      category: "Food & Drink"
    },
    {
      code: "U+1F95A",
      name: "egg",
      image: "\uD83E\uDD5A",
      category: "Food & Drink"
    },
    {
      code: "U+1F373",
      name: "cooking",
      image: "\uD83C\uDF73",
      category: "Food & Drink"
    },
    {
      code: "U+1F958",
      name: "shallow pan of food",
      image: "\uD83E\uDD58",
      category: "Food & Drink"
    },
    {
      code: "U+1F372",
      name: "pot of food",
      image: "\uD83C\uDF72",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD5",
      name: "fondue",
      image: "\uD83E\uDED5",
      category: "Food & Drink"
    },
    {
      code: "U+1F963",
      name: "bowl with spoon",
      image: "\uD83E\uDD63",
      category: "Food & Drink"
    },
    {
      code: "U+1F957",
      name: "green salad",
      image: "\uD83E\uDD57",
      category: "Food & Drink"
    },
    {
      code: "U+1F37F",
      name: "popcorn",
      image: "\uD83C\uDF7F",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C8",
      name: "butter",
      image: "\uD83E\uDDC8",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C2",
      name: "salt",
      image: "\uD83E\uDDC2",
      category: "Food & Drink"
    },
    {
      code: "U+1F96B",
      name: "canned food",
      image: "\uD83E\uDD6B",
      category: "Food & Drink"
    },
    {
      code: "U+1F371",
      name: "bento box",
      image: "\uD83C\uDF71",
      category: "Food & Drink"
    },
    {
      code: "U+1F358",
      name: "rice cracker",
      image: "\uD83C\uDF58",
      category: "Food & Drink"
    },
    {
      code: "U+1F359",
      name: "rice ball",
      image: "\uD83C\uDF59",
      category: "Food & Drink"
    },
    {
      code: "U+1F35A",
      name: "cooked rice",
      image: "\uD83C\uDF5A",
      category: "Food & Drink"
    },
    {
      code: "U+1F35B",
      name: "curry rice",
      image: "\uD83C\uDF5B",
      category: "Food & Drink"
    },
    {
      code: "U+1F35C",
      name: "steaming bowl",
      image: "\uD83C\uDF5C",
      category: "Food & Drink"
    },
    {
      code: "U+1F35D",
      name: "spaghetti",
      image: "\uD83C\uDF5D",
      category: "Food & Drink"
    },
    {
      code: "U+1F360",
      name: "roasted sweet potato",
      image: "\uD83C\uDF60",
      category: "Food & Drink"
    },
    {
      code: "U+1F362",
      name: "oden",
      image: "\uD83C\uDF62",
      category: "Food & Drink"
    },
    {
      code: "U+1F363",
      name: "sushi",
      image: "\uD83C\uDF63",
      category: "Food & Drink"
    },
    {
      code: "U+1F364",
      name: "fried shrimp",
      image: "\uD83C\uDF64",
      category: "Food & Drink"
    },
    {
      code: "U+1F365",
      name: "fish cake with swirl",
      image: "\uD83C\uDF65",
      category: "Food & Drink"
    },
    {
      code: "U+1F96E",
      name: "moon cake",
      image: "\uD83E\uDD6E",
      category: "Food & Drink"
    },
    {
      code: "U+1F361",
      name: "dango",
      image: "\uD83C\uDF61",
      category: "Food & Drink"
    },
    {
      code: "U+1F95F",
      name: "dumpling",
      image: "\uD83E\uDD5F",
      category: "Food & Drink"
    },
    {
      code: "U+1F960",
      name: "fortune cookie",
      image: "\uD83E\uDD60",
      category: "Food & Drink"
    },
    {
      code: "U+1F961",
      name: "takeout box",
      image: "\uD83E\uDD61",
      category: "Food & Drink"
    },
    {
      code: "U+1F980",
      name: "crab",
      image: "\uD83E\uDD80",
      category: "Food & Drink"
    },
    {
      code: "U+1F99E",
      name: "lobster",
      image: "\uD83E\uDD9E",
      category: "Food & Drink"
    },
    {
      code: "U+1F990",
      name: "shrimp",
      image: "\uD83E\uDD90",
      category: "Food & Drink"
    },
    {
      code: "U+1F991",
      name: "squid",
      image: "\uD83E\uDD91",
      category: "Food & Drink"
    },
    {
      code: "U+1F9AA",
      name: "oyster",
      image: "\uD83E\uDDAA",
      category: "Food & Drink"
    },
    {
      code: "U+1F366",
      name: "soft ice cream",
      image: "\uD83C\uDF66",
      category: "Food & Drink"
    },
    {
      code: "U+1F367",
      name: "shaved ice",
      image: "\uD83C\uDF67",
      category: "Food & Drink"
    },
    {
      code: "U+1F368",
      name: "ice cream",
      image: "\uD83C\uDF68",
      category: "Food & Drink"
    },
    {
      code: "U+1F369",
      name: "doughnut",
      image: "\uD83C\uDF69",
      category: "Food & Drink"
    },
    {
      code: "U+1F36A",
      name: "cookie",
      image: "\uD83C\uDF6A",
      category: "Food & Drink"
    },
    {
      code: "U+1F382",
      name: "birthday cake",
      image: "\uD83C\uDF82",
      category: "Food & Drink"
    },
    {
      code: "U+1F370",
      name: "shortcake",
      image: "\uD83C\uDF70",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C1",
      name: "cupcake",
      image: "\uD83E\uDDC1",
      category: "Food & Drink"
    },
    {
      code: "U+1F967",
      name: "pie",
      image: "\uD83E\uDD67",
      category: "Food & Drink"
    },
    {
      code: "U+1F36B",
      name: "chocolate bar",
      image: "\uD83C\uDF6B",
      category: "Food & Drink"
    },
    {
      code: "U+1F36C",
      name: "candy",
      image: "\uD83C\uDF6C",
      category: "Food & Drink"
    },
    {
      code: "U+1F36D",
      name: "lollipop",
      image: "\uD83C\uDF6D",
      category: "Food & Drink"
    },
    {
      code: "U+1F36E",
      name: "custard",
      image: "\uD83C\uDF6E",
      category: "Food & Drink"
    },
    {
      code: "U+1F36F",
      name: "honey pot",
      image: "\uD83C\uDF6F",
      category: "Food & Drink"
    },
    {
      code: "U+1F37C",
      name: "baby bottle",
      image: "\uD83C\uDF7C",
      category: "Food & Drink"
    },
    {
      code: "U+1F95B",
      name: "glass of milk",
      image: "\uD83E\uDD5B",
      category: "Food & Drink"
    },
    {
      code: "U+2615",
      name: "hot beverage",
      image: "☕",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD6",
      name: "teapot",
      image: "\uD83E\uDED6",
      category: "Food & Drink"
    },
    {
      code: "U+1F375",
      name: "teacup without handle",
      image: "\uD83C\uDF75",
      category: "Food & Drink"
    },
    {
      code: "U+1F376",
      name: "sake",
      image: "\uD83C\uDF76",
      category: "Food & Drink"
    },
    {
      code: "U+1F37E",
      name: "bottle with popping cork",
      image: "\uD83C\uDF7E",
      category: "Food & Drink"
    },
    {
      code: "U+1F377",
      name: "wine glass",
      image: "\uD83C\uDF77",
      category: "Food & Drink"
    },
    {
      code: "U+1F378",
      name: "cocktail glass",
      image: "\uD83C\uDF78",
      category: "Food & Drink"
    },
    {
      code: "U+1F379",
      name: "tropical drink",
      image: "\uD83C\uDF79",
      category: "Food & Drink"
    },
    {
      code: "U+1F37A",
      name: "beer mug",
      image: "\uD83C\uDF7A",
      category: "Food & Drink"
    },
    {
      code: "U+1F37B",
      name: "clinking beer mugs",
      image: "\uD83C\uDF7B",
      category: "Food & Drink"
    },
    {
      code: "U+1F942",
      name: "clinking glasses",
      image: "\uD83E\uDD42",
      category: "Food & Drink"
    },
    {
      code: "U+1F943",
      name: "tumbler glass",
      image: "\uD83E\uDD43",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD7",
      name: "pouring liquid",
      image: "\uD83E\uDED7",
      category: "Food & Drink"
    },
    {
      code: "U+1F964",
      name: "cup with straw",
      image: "\uD83E\uDD64",
      category: "Food & Drink"
    },
    {
      code: "U+1F9CB",
      name: "bubble tea",
      image: "\uD83E\uDDCB",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C3",
      name: "beverage box",
      image: "\uD83E\uDDC3",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C9",
      name: "mate",
      image: "\uD83E\uDDC9",
      category: "Food & Drink"
    },
    {
      code: "U+1F9CA",
      name: "ice",
      image: "\uD83E\uDDCA",
      category: "Food & Drink"
    },
    {
      code: "U+1F962",
      name: "chopsticks",
      image: "\uD83E\uDD62",
      category: "Food & Drink"
    },
    {
      code: "U+1F37D",
      name: "fork and knife with plate",
      image: "\uD83C\uDF7D",
      category: "Food & Drink"
    },
    {
      code: "U+1F374",
      name: "fork and knife",
      image: "\uD83C\uDF74",
      category: "Food & Drink"
    },
    {
      code: "U+1F944",
      name: "spoon",
      image: "\uD83E\uDD44",
      category: "Food & Drink"
    },
    {
      code: "U+1F52A",
      name: "kitchen knife",
      image: "\uD83D\uDD2A",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD9",
      name: "jar",
      image: "\uD83E\uDED9",
      category: "Food & Drink"
    },
    {
      code: "U+1F3FA",
      name: "amphora",
      image: "\uD83C\uDFFA",
      category: "Food & Drink"
    },
    {
      code: "U+1F30D",
      name: "globe showing Europe-Africa",
      image: "\uD83C\uDF0D",
      category: "Travel & Places"
    },
    {
      code: "U+1F30E",
      name: "globe showing Americas",
      image: "\uD83C\uDF0E",
      category: "Travel & Places"
    },
    {
      code: "U+1F30F",
      name: "globe showing Asia-Australia",
      image: "\uD83C\uDF0F",
      category: "Travel & Places"
    },
    {
      code: "U+1F310",
      name: "globe with meridians",
      image: "\uD83C\uDF10",
      category: "Travel & Places"
    },
    {
      code: "U+1F5FA",
      name: "world map",
      image: "\uD83D\uDDFA",
      category: "Travel & Places"
    },
    {
      code: "U+1F5FE",
      name: "map of Japan",
      image: "\uD83D\uDDFE",
      category: "Travel & Places"
    },
    {
      code: "U+1F9ED",
      name: "compass",
      image: "\uD83E\uDDED",
      category: "Travel & Places"
    },
    {
      code: "U+1F3D4",
      name: "snow-capped mountain",
      image: "\uD83C\uDFD4",
      category: "Travel & Places"
    },
    {
      code: "U+26F0",
      name: "mountain",
      image: "⛰",
      category: "Travel & Places"
    },
    {
      code: "U+1F30B",
      name: "volcano",
      image: "\uD83C\uDF0B",
      category: "Travel & Places"
    },
    {
      code: "U+1F5FB",
      name: "mount fuji",
      image: "\uD83D\uDDFB",
      category: "Travel & Places"
    },
    {
      code: "U+1F3D5",
      name: "camping",
      image: "\uD83C\uDFD5",
      category: "Travel & Places"
    },
    {
      code: "U+1F3D6",
      name: "beach with umbrella",
      image: "\uD83C\uDFD6",
      category: "Travel & Places"
    },
    {
      code: "U+1F3DC",
      name: "desert",
      image: "\uD83C\uDFDC",
      category: "Travel & Places"
    },
    {
      code: "U+1F3DD",
      name: "desert island",
      image: "\uD83C\uDFDD",
      category: "Travel & Places"
    },
    {
      code: "U+1F3DE",
      name: "national park",
      image: "\uD83C\uDFDE",
      category: "Travel & Places"
    },
    {
      code: "U+1F3DF",
      name: "stadium",
      image: "\uD83C\uDFDF",
      category: "Travel & Places"
    },
    {
      code: "U+1F3DB",
      name: "classical building",
      image: "\uD83C\uDFDB",
      category: "Travel & Places"
    },
    {
      code: "U+1F3D7",
      name: "building construction",
      image: "\uD83C\uDFD7",
      category: "Travel & Places"
    },
    {
      code: "U+1F9F1",
      name: "brick",
      image: "\uD83E\uDDF1",
      category: "Travel & Places"
    },
    {
      code: "U+1FAA8",
      name: "rock",
      image: "\uD83E\uDEA8",
      category: "Travel & Places"
    },
    {
      code: "U+1FAB5",
      name: "wood",
      image: "\uD83E\uDEB5",
      category: "Travel & Places"
    },
    {
      code: "U+1F6D6",
      name: "hut",
      image: "\uD83D\uDED6",
      category: "Travel & Places"
    },
    {
      code: "U+1F3D8",
      name: "houses",
      image: "\uD83C\uDFD8",
      category: "Travel & Places"
    },
    {
      code: "U+1F3DA",
      name: "derelict house",
      image: "\uD83C\uDFDA",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E0",
      name: "house",
      image: "\uD83C\uDFE0",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E1",
      name: "house with garden",
      image: "\uD83C\uDFE1",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E2",
      name: "office building",
      image: "\uD83C\uDFE2",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E3",
      name: "Japanese post office",
      image: "\uD83C\uDFE3",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E4",
      name: "post office",
      image: "\uD83C\uDFE4",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E5",
      name: "hospital",
      image: "\uD83C\uDFE5",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E6",
      name: "bank",
      image: "\uD83C\uDFE6",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E8",
      name: "hotel",
      image: "\uD83C\uDFE8",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E9",
      name: "love hotel",
      image: "\uD83C\uDFE9",
      category: "Travel & Places"
    },
    {
      code: "U+1F3EA",
      name: "convenience store",
      image: "\uD83C\uDFEA",
      category: "Travel & Places"
    },
    {
      code: "U+1F3EB",
      name: "school",
      image: "\uD83C\uDFEB",
      category: "Travel & Places"
    },
    {
      code: "U+1F3EC",
      name: "department store",
      image: "\uD83C\uDFEC",
      category: "Travel & Places"
    },
    {
      code: "U+1F3ED",
      name: "factory",
      image: "\uD83C\uDFED",
      category: "Travel & Places"
    },
    {
      code: "U+1F3EF",
      name: "Japanese castle",
      image: "\uD83C\uDFEF",
      category: "Travel & Places"
    },
    {
      code: "U+1F3F0",
      name: "castle",
      image: "\uD83C\uDFF0",
      category: "Travel & Places"
    },
    {
      code: "U+1F492",
      name: "wedding",
      image: "\uD83D\uDC92",
      category: "Travel & Places"
    },
    {
      code: "U+1F5FC",
      name: "Tokyo tower",
      image: "\uD83D\uDDFC",
      category: "Travel & Places"
    },
    {
      code: "U+1F5FD",
      name: "Statue of Liberty",
      image: "\uD83D\uDDFD",
      category: "Travel & Places"
    },
    {
      code: "U+26EA",
      name: "church",
      image: "⛪",
      category: "Travel & Places"
    },
    {
      code: "U+1F54C",
      name: "mosque",
      image: "\uD83D\uDD4C",
      category: "Travel & Places"
    },
    {
      code: "U+1F6D5",
      name: "hindu temple",
      image: "\uD83D\uDED5",
      category: "Travel & Places"
    },
    {
      code: "U+1F54D",
      name: "synagogue",
      image: "\uD83D\uDD4D",
      category: "Travel & Places"
    },
    {
      code: "U+26E9",
      name: "shinto shrine",
      image: "⛩",
      category: "Travel & Places"
    },
    {
      code: "U+1F54B",
      name: "kaaba",
      image: "\uD83D\uDD4B",
      category: "Travel & Places"
    },
    {
      code: "U+26F2",
      name: "fountain",
      image: "⛲",
      category: "Travel & Places"
    },
    {
      code: "U+26FA",
      name: "tent",
      image: "⛺",
      category: "Travel & Places"
    },
    {
      code: "U+1F301",
      name: "foggy",
      image: "\uD83C\uDF01",
      category: "Travel & Places"
    },
    {
      code: "U+1F303",
      name: "night with stars",
      image: "\uD83C\uDF03",
      category: "Travel & Places"
    },
    {
      code: "U+1F3D9",
      name: "cityscape",
      image: "\uD83C\uDFD9",
      category: "Travel & Places"
    },
    {
      code: "U+1F304",
      name: "sunrise over mountains",
      image: "\uD83C\uDF04",
      category: "Travel & Places"
    },
    {
      code: "U+1F305",
      name: "sunrise",
      image: "\uD83C\uDF05",
      category: "Travel & Places"
    },
    {
      code: "U+1F306",
      name: "cityscape at dusk",
      image: "\uD83C\uDF06",
      category: "Travel & Places"
    },
    {
      code: "U+1F307",
      name: "sunset",
      image: "\uD83C\uDF07",
      category: "Travel & Places"
    },
    {
      code: "U+1F309",
      name: "bridge at night",
      image: "\uD83C\uDF09",
      category: "Travel & Places"
    },
    {
      code: "U+2668",
      name: "hot springs",
      image: "♨",
      category: "Travel & Places"
    },
    {
      code: "U+1F3A0",
      name: "carousel horse",
      image: "\uD83C\uDFA0",
      category: "Travel & Places"
    },
    {
      code: "U+1F6DD",
      name: "playground slide",
      image: "\uD83D\uDEDD",
      category: "Travel & Places"
    },
    {
      code: "U+1F3A1",
      name: "ferris wheel",
      image: "\uD83C\uDFA1",
      category: "Travel & Places"
    },
    {
      code: "U+1F3A2",
      name: "roller coaster",
      image: "\uD83C\uDFA2",
      category: "Travel & Places"
    },
    {
      code: "U+1F488",
      name: "barber pole",
      image: "\uD83D\uDC88",
      category: "Travel & Places"
    },
    {
      code: "U+1F3AA",
      name: "circus tent",
      image: "\uD83C\uDFAA",
      category: "Travel & Places"
    },
    {
      code: "U+1F682",
      name: "locomotive",
      image: "\uD83D\uDE82",
      category: "Travel & Places"
    },
    {
      code: "U+1F683",
      name: "railway car",
      image: "\uD83D\uDE83",
      category: "Travel & Places"
    },
    {
      code: "U+1F684",
      name: "high-speed train",
      image: "\uD83D\uDE84",
      category: "Travel & Places"
    },
    {
      code: "U+1F685",
      name: "bullet train",
      image: "\uD83D\uDE85",
      category: "Travel & Places"
    },
    {
      code: "U+1F686",
      name: "train",
      image: "\uD83D\uDE86",
      category: "Travel & Places"
    },
    {
      code: "U+1F687",
      name: "metro",
      image: "\uD83D\uDE87",
      category: "Travel & Places"
    },
    {
      code: "U+1F688",
      name: "light rail",
      image: "\uD83D\uDE88",
      category: "Travel & Places"
    },
    {
      code: "U+1F689",
      name: "station",
      image: "\uD83D\uDE89",
      category: "Travel & Places"
    },
    {
      code: "U+1F68A",
      name: "tram",
      image: "\uD83D\uDE8A",
      category: "Travel & Places"
    },
    {
      code: "U+1F69D",
      name: "monorail",
      image: "\uD83D\uDE9D",
      category: "Travel & Places"
    },
    {
      code: "U+1F69E",
      name: "mountain railway",
      image: "\uD83D\uDE9E",
      category: "Travel & Places"
    },
    {
      code: "U+1F68B",
      name: "tram car",
      image: "\uD83D\uDE8B",
      category: "Travel & Places"
    },
    {
      code: "U+1F68C",
      name: "bus",
      image: "\uD83D\uDE8C",
      category: "Travel & Places"
    },
    {
      code: "U+1F68D",
      name: "oncoming bus",
      image: "\uD83D\uDE8D",
      category: "Travel & Places"
    },
    {
      code: "U+1F68E",
      name: "trolleybus",
      image: "\uD83D\uDE8E",
      category: "Travel & Places"
    },
    {
      code: "U+1F690",
      name: "minibus",
      image: "\uD83D\uDE90",
      category: "Travel & Places"
    },
    {
      code: "U+1F691",
      name: "ambulance",
      image: "\uD83D\uDE91",
      category: "Travel & Places"
    },
    {
      code: "U+1F692",
      name: "fire engine",
      image: "\uD83D\uDE92",
      category: "Travel & Places"
    },
    {
      code: "U+1F693",
      name: "police car",
      image: "\uD83D\uDE93",
      category: "Travel & Places"
    },
    {
      code: "U+1F694",
      name: "oncoming police car",
      image: "\uD83D\uDE94",
      category: "Travel & Places"
    },
    {
      code: "U+1F695",
      name: "taxi",
      image: "\uD83D\uDE95",
      category: "Travel & Places"
    },
    {
      code: "U+1F696",
      name: "oncoming taxi",
      image: "\uD83D\uDE96",
      category: "Travel & Places"
    },
    {
      code: "U+1F697",
      name: "automobile",
      image: "\uD83D\uDE97",
      category: "Travel & Places"
    },
    {
      code: "U+1F698",
      name: "oncoming automobile",
      image: "\uD83D\uDE98",
      category: "Travel & Places"
    },
    {
      code: "U+1F699",
      name: "sport utility vehicle",
      image: "\uD83D\uDE99",
      category: "Travel & Places"
    },
    {
      code: "U+1F6FB",
      name: "pickup truck",
      image: "\uD83D\uDEFB",
      category: "Travel & Places"
    },
    {
      code: "U+1F69A",
      name: "delivery truck",
      image: "\uD83D\uDE9A",
      category: "Travel & Places"
    },
    {
      code: "U+1F69B",
      name: "articulated lorry",
      image: "\uD83D\uDE9B",
      category: "Travel & Places"
    },
    {
      code: "U+1F69C",
      name: "tractor",
      image: "\uD83D\uDE9C",
      category: "Travel & Places"
    },
    {
      code: "U+1F3CE",
      name: "racing car",
      image: "\uD83C\uDFCE",
      category: "Travel & Places"
    },
    {
      code: "U+1F3CD",
      name: "motorcycle",
      image: "\uD83C\uDFCD",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F5",
      name: "motor scooter",
      image: "\uD83D\uDEF5",
      category: "Travel & Places"
    },
    {
      code: "U+1F9BD",
      name: "manual wheelchair",
      image: "\uD83E\uDDBD",
      category: "Travel & Places"
    },
    {
      code: "U+1F9BC",
      name: "motorized wheelchair",
      image: "\uD83E\uDDBC",
      category: "Travel & Places"
    },
    {
      code: "U+1F6FA",
      name: "auto rickshaw",
      image: "\uD83D\uDEFA",
      category: "Travel & Places"
    },
    {
      code: "U+1F6B2",
      name: "bicycle",
      image: "\uD83D\uDEB2",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F4",
      name: "kick scooter",
      image: "\uD83D\uDEF4",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F9",
      name: "skateboard",
      image: "\uD83D\uDEF9",
      category: "Travel & Places"
    },
    {
      code: "U+1F6FC",
      name: "roller skate",
      image: "\uD83D\uDEFC",
      category: "Travel & Places"
    },
    {
      code: "U+1F68F",
      name: "bus stop",
      image: "\uD83D\uDE8F",
      category: "Travel & Places"
    },
    {
      code: "U+1F6E3",
      name: "motorway",
      image: "\uD83D\uDEE3",
      category: "Travel & Places"
    },
    {
      code: "U+1F6E4",
      name: "railway track",
      image: "\uD83D\uDEE4",
      category: "Travel & Places"
    },
    {
      code: "U+1F6E2",
      name: "oil drum",
      image: "\uD83D\uDEE2",
      category: "Travel & Places"
    },
    {
      code: "U+26FD",
      name: "fuel pump",
      image: "⛽",
      category: "Travel & Places"
    },
    {
      code: "U+1F6DE",
      name: "wheel",
      image: "\uD83D\uDEDE",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A8",
      name: "police car light",
      image: "\uD83D\uDEA8",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A5",
      name: "horizontal traffic light",
      image: "\uD83D\uDEA5",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A6",
      name: "vertical traffic light",
      image: "\uD83D\uDEA6",
      category: "Travel & Places"
    },
    {
      code: "U+1F6D1",
      name: "stop sign",
      image: "\uD83D\uDED1",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A7",
      name: "construction",
      image: "\uD83D\uDEA7",
      category: "Travel & Places"
    },
    {
      code: "U+2693",
      name: "anchor",
      image: "⚓",
      category: "Travel & Places"
    },
    {
      code: "U+1F6DF",
      name: "ring buoy",
      image: "\uD83D\uDEDF",
      category: "Travel & Places"
    },
    {
      code: "U+26F5",
      name: "sailboat",
      image: "⛵",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F6",
      name: "canoe",
      image: "\uD83D\uDEF6",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A4",
      name: "speedboat",
      image: "\uD83D\uDEA4",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F3",
      name: "passenger ship",
      image: "\uD83D\uDEF3",
      category: "Travel & Places"
    },
    {
      code: "U+26F4",
      name: "ferry",
      image: "⛴",
      category: "Travel & Places"
    },
    {
      code: "U+1F6E5",
      name: "motor boat",
      image: "\uD83D\uDEE5",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A2",
      name: "ship",
      image: "\uD83D\uDEA2",
      category: "Travel & Places"
    },
    {
      code: "U+2708",
      name: "airplane",
      image: "✈",
      category: "Travel & Places"
    },
    {
      code: "U+1F6E9",
      name: "small airplane",
      image: "\uD83D\uDEE9",
      category: "Travel & Places"
    },
    {
      code: "U+1F6EB",
      name: "airplane departure",
      image: "\uD83D\uDEEB",
      category: "Travel & Places"
    },
    {
      code: "U+1F6EC",
      name: "airplane arrival",
      image: "\uD83D\uDEEC",
      category: "Travel & Places"
    },
    {
      code: "U+1FA82",
      name: "parachute",
      image: "\uD83E\uDE82",
      category: "Travel & Places"
    },
    {
      code: "U+1F4BA",
      name: "seat",
      image: "\uD83D\uDCBA",
      category: "Travel & Places"
    },
    {
      code: "U+1F681",
      name: "helicopter",
      image: "\uD83D\uDE81",
      category: "Travel & Places"
    },
    {
      code: "U+1F69F",
      name: "suspension railway",
      image: "\uD83D\uDE9F",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A0",
      name: "mountain cableway",
      image: "\uD83D\uDEA0",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A1",
      name: "aerial tramway",
      image: "\uD83D\uDEA1",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F0",
      name: "satellite",
      image: "\uD83D\uDEF0",
      category: "Travel & Places"
    },
    {
      code: "U+1F680",
      name: "rocket",
      image: "\uD83D\uDE80",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F8",
      name: "flying saucer",
      image: "\uD83D\uDEF8",
      category: "Travel & Places"
    },
    {
      code: "U+1F6CE",
      name: "bellhop bell",
      image: "\uD83D\uDECE",
      category: "Travel & Places"
    },
    {
      code: "U+1F9F3",
      name: "luggage",
      image: "\uD83E\uDDF3",
      category: "Travel & Places"
    },
    {
      code: "U+231B",
      name: "hourglass done",
      image: "⌛",
      category: "Travel & Places"
    },
    {
      code: "U+23F3",
      name: "hourglass not done",
      image: "⏳",
      category: "Travel & Places"
    },
    {
      code: "U+231A",
      name: "watch",
      image: "⌚",
      category: "Travel & Places"
    },
    {
      code: "U+23F0",
      name: "alarm clock",
      image: "⏰",
      category: "Travel & Places"
    },
    {
      code: "U+23F1",
      name: "stopwatch",
      image: "⏱",
      category: "Travel & Places"
    },
    {
      code: "U+23F2",
      name: "timer clock",
      image: "⏲",
      category: "Travel & Places"
    },
    {
      code: "U+1F570",
      name: "mantelpiece clock",
      image: "\uD83D\uDD70",
      category: "Travel & Places"
    },
    {
      code: "U+1F55B",
      name: "twelve o’clock",
      image: "\uD83D\uDD5B",
      category: "Travel & Places"
    },
    {
      code: "U+1F567",
      name: "twelve-thirty",
      image: "\uD83D\uDD67",
      category: "Travel & Places"
    },
    {
      code: "U+1F550",
      name: "one o’clock",
      image: "\uD83D\uDD50",
      category: "Travel & Places"
    },
    {
      code: "U+1F55C",
      name: "one-thirty",
      image: "\uD83D\uDD5C",
      category: "Travel & Places"
    },
    {
      code: "U+1F551",
      name: "two o’clock",
      image: "\uD83D\uDD51",
      category: "Travel & Places"
    },
    {
      code: "U+1F55D",
      name: "two-thirty",
      image: "\uD83D\uDD5D",
      category: "Travel & Places"
    },
    {
      code: "U+1F552",
      name: "three o’clock",
      image: "\uD83D\uDD52",
      category: "Travel & Places"
    },
    {
      code: "U+1F55E",
      name: "three-thirty",
      image: "\uD83D\uDD5E",
      category: "Travel & Places"
    },
    {
      code: "U+1F553",
      name: "four o’clock",
      image: "\uD83D\uDD53",
      category: "Travel & Places"
    },
    {
      code: "U+1F55F",
      name: "four-thirty",
      image: "\uD83D\uDD5F",
      category: "Travel & Places"
    },
    {
      code: "U+1F554",
      name: "five o’clock",
      image: "\uD83D\uDD54",
      category: "Travel & Places"
    },
    {
      code: "U+1F560",
      name: "five-thirty",
      image: "\uD83D\uDD60",
      category: "Travel & Places"
    },
    {
      code: "U+1F555",
      name: "six o’clock",
      image: "\uD83D\uDD55",
      category: "Travel & Places"
    },
    {
      code: "U+1F561",
      name: "six-thirty",
      image: "\uD83D\uDD61",
      category: "Travel & Places"
    },
    {
      code: "U+1F556",
      name: "seven o’clock",
      image: "\uD83D\uDD56",
      category: "Travel & Places"
    },
    {
      code: "U+1F562",
      name: "seven-thirty",
      image: "\uD83D\uDD62",
      category: "Travel & Places"
    },
    {
      code: "U+1F557",
      name: "eight o’clock",
      image: "\uD83D\uDD57",
      category: "Travel & Places"
    },
    {
      code: "U+1F563",
      name: "eight-thirty",
      image: "\uD83D\uDD63",
      category: "Travel & Places"
    },
    {
      code: "U+1F558",
      name: "nine o’clock",
      image: "\uD83D\uDD58",
      category: "Travel & Places"
    },
    {
      code: "U+1F564",
      name: "nine-thirty",
      image: "\uD83D\uDD64",
      category: "Travel & Places"
    },
    {
      code: "U+1F559",
      name: "ten o’clock",
      image: "\uD83D\uDD59",
      category: "Travel & Places"
    },
    {
      code: "U+1F565",
      name: "ten-thirty",
      image: "\uD83D\uDD65",
      category: "Travel & Places"
    },
    {
      code: "U+1F55A",
      name: "eleven o’clock",
      image: "\uD83D\uDD5A",
      category: "Travel & Places"
    },
    {
      code: "U+1F566",
      name: "eleven-thirty",
      image: "\uD83D\uDD66",
      category: "Travel & Places"
    },
    {
      code: "U+1F311",
      name: "new moon",
      image: "\uD83C\uDF11",
      category: "Travel & Places"
    },
    {
      code: "U+1F312",
      name: "waxing crescent moon",
      image: "\uD83C\uDF12",
      category: "Travel & Places"
    },
    {
      code: "U+1F313",
      name: "first quarter moon",
      image: "\uD83C\uDF13",
      category: "Travel & Places"
    },
    {
      code: "U+1F314",
      name: "waxing gibbous moon",
      image: "\uD83C\uDF14",
      category: "Travel & Places"
    },
    {
      code: "U+1F315",
      name: "full moon",
      image: "\uD83C\uDF15",
      category: "Travel & Places"
    },
    {
      code: "U+1F316",
      name: "waning gibbous moon",
      image: "\uD83C\uDF16",
      category: "Travel & Places"
    },
    {
      code: "U+1F317",
      name: "last quarter moon",
      image: "\uD83C\uDF17",
      category: "Travel & Places"
    },
    {
      code: "U+1F318",
      name: "waning crescent moon",
      image: "\uD83C\uDF18",
      category: "Travel & Places"
    },
    {
      code: "U+1F319",
      name: "crescent moon",
      image: "\uD83C\uDF19",
      category: "Travel & Places"
    },
    {
      code: "U+1F31A",
      name: "new moon face",
      image: "\uD83C\uDF1A",
      category: "Travel & Places"
    },
    {
      code: "U+1F31B",
      name: "first quarter moon face",
      image: "\uD83C\uDF1B",
      category: "Travel & Places"
    },
    {
      code: "U+1F31C",
      name: "last quarter moon face",
      image: "\uD83C\uDF1C",
      category: "Travel & Places"
    },
    {
      code: "U+1F321",
      name: "thermometer",
      image: "\uD83C\uDF21",
      category: "Travel & Places"
    },
    {
      code: "U+2600",
      name: "sun",
      image: "☀",
      category: "Travel & Places"
    },
    {
      code: "U+1F31D",
      name: "full moon face",
      image: "\uD83C\uDF1D",
      category: "Travel & Places"
    },
    {
      code: "U+1F31E",
      name: "sun with face",
      image: "\uD83C\uDF1E",
      category: "Travel & Places"
    },
    {
      code: "U+1FA90",
      name: "ringed planet",
      image: "\uD83E\uDE90",
      category: "Travel & Places"
    },
    {
      code: "U+2B50",
      name: "star",
      image: "⭐",
      category: "Travel & Places"
    },
    {
      code: "U+1F31F",
      name: "glowing star",
      image: "\uD83C\uDF1F",
      category: "Travel & Places"
    },
    {
      code: "U+1F320",
      name: "shooting star",
      image: "\uD83C\uDF20",
      category: "Travel & Places"
    },
    {
      code: "U+1F30C",
      name: "milky way",
      image: "\uD83C\uDF0C",
      category: "Travel & Places"
    },
    {
      code: "U+2601",
      name: "cloud",
      image: "☁",
      category: "Travel & Places"
    },
    {
      code: "U+26C5",
      name: "sun behind cloud",
      image: "⛅",
      category: "Travel & Places"
    },
    {
      code: "U+26C8",
      name: "cloud with lightning and rain",
      image: "⛈",
      category: "Travel & Places"
    },
    {
      code: "U+1F324",
      name: "sun behind small cloud",
      image: "\uD83C\uDF24",
      category: "Travel & Places"
    },
    {
      code: "U+1F325",
      name: "sun behind large cloud",
      image: "\uD83C\uDF25",
      category: "Travel & Places"
    },
    {
      code: "U+1F326",
      name: "sun behind rain cloud",
      image: "\uD83C\uDF26",
      category: "Travel & Places"
    },
    {
      code: "U+1F327",
      name: "cloud with rain",
      image: "\uD83C\uDF27",
      category: "Travel & Places"
    },
    {
      code: "U+1F328",
      name: "cloud with snow",
      image: "\uD83C\uDF28",
      category: "Travel & Places"
    },
    {
      code: "U+1F329",
      name: "cloud with lightning",
      image: "\uD83C\uDF29",
      category: "Travel & Places"
    },
    {
      code: "U+1F32A",
      name: "tornado",
      image: "\uD83C\uDF2A",
      category: "Travel & Places"
    },
    {
      code: "U+1F32B",
      name: "fog",
      image: "\uD83C\uDF2B",
      category: "Travel & Places"
    },
    {
      code: "U+1F32C",
      name: "wind face",
      image: "\uD83C\uDF2C",
      category: "Travel & Places"
    },
    {
      code: "U+1F300",
      name: "cyclone",
      image: "\uD83C\uDF00",
      category: "Travel & Places"
    },
    {
      code: "U+1F308",
      name: "rainbow",
      image: "\uD83C\uDF08",
      category: "Travel & Places"
    },
    {
      code: "U+1F302",
      name: "closed umbrella",
      image: "\uD83C\uDF02",
      category: "Travel & Places"
    },
    {
      code: "U+2602",
      name: "umbrella",
      image: "☂",
      category: "Travel & Places"
    },
    {
      code: "U+2614",
      name: "umbrella with rain drops",
      image: "☔",
      category: "Travel & Places"
    },
    {
      code: "U+26F1",
      name: "umbrella on ground",
      image: "⛱",
      category: "Travel & Places"
    },
    {
      code: "U+26A1",
      name: "high voltage",
      image: "⚡",
      category: "Travel & Places"
    },
    {
      code: "U+2744",
      name: "snowflake",
      image: "❄",
      category: "Travel & Places"
    },
    {
      code: "U+2603",
      name: "snowman",
      image: "☃",
      category: "Travel & Places"
    },
    {
      code: "U+26C4",
      name: "snowman without snow",
      image: "⛄",
      category: "Travel & Places"
    },
    {
      code: "U+2604",
      name: "comet",
      image: "☄",
      category: "Travel & Places"
    },
    {
      code: "U+1F525",
      name: "fire",
      image: "\uD83D\uDD25",
      category: "Travel & Places"
    },
    {
      code: "U+1F4A7",
      name: "droplet",
      image: "\uD83D\uDCA7",
      category: "Travel & Places"
    },
    {
      code: "U+1F30A",
      name: "water wave",
      image: "\uD83C\uDF0A",
      category: "Travel & Places"
    },
    {
      code: "U+1F383",
      name: "jack-o-lantern",
      image: "\uD83C\uDF83",
      category: "Activities"
    },
    {
      code: "U+1F384",
      name: "Christmas tree",
      image: "\uD83C\uDF84",
      category: "Activities"
    },
    {
      code: "U+1F386",
      name: "fireworks",
      image: "\uD83C\uDF86",
      category: "Activities"
    },
    {
      code: "U+1F387",
      name: "sparkler",
      image: "\uD83C\uDF87",
      category: "Activities"
    },
    {
      code: "U+1F9E8",
      name: "firecracker",
      image: "\uD83E\uDDE8",
      category: "Activities"
    },
    {
      code: "U+2728",
      name: "sparkles",
      image: "✨",
      category: "Activities"
    },
    {
      code: "U+1F388",
      name: "balloon",
      image: "\uD83C\uDF88",
      category: "Activities"
    },
    {
      code: "U+1F389",
      name: "party popper",
      image: "\uD83C\uDF89",
      category: "Activities"
    },
    {
      code: "U+1F38A",
      name: "confetti ball",
      image: "\uD83C\uDF8A",
      category: "Activities"
    },
    {
      code: "U+1F38B",
      name: "tanabata tree",
      image: "\uD83C\uDF8B",
      category: "Activities"
    },
    {
      code: "U+1F38D",
      name: "pine decoration",
      image: "\uD83C\uDF8D",
      category: "Activities"
    },
    {
      code: "U+1F38E",
      name: "Japanese dolls",
      image: "\uD83C\uDF8E",
      category: "Activities"
    },
    {
      code: "U+1F38F",
      name: "carp streamer",
      image: "\uD83C\uDF8F",
      category: "Activities"
    },
    {
      code: "U+1F390",
      name: "wind chime",
      image: "\uD83C\uDF90",
      category: "Activities"
    },
    {
      code: "U+1F391",
      name: "moon viewing ceremony",
      image: "\uD83C\uDF91",
      category: "Activities"
    },
    {
      code: "U+1F9E7",
      name: "red envelope",
      image: "\uD83E\uDDE7",
      category: "Activities"
    },
    {
      code: "U+1F380",
      name: "ribbon",
      image: "\uD83C\uDF80",
      category: "Activities"
    },
    {
      code: "U+1F381",
      name: "wrapped gift",
      image: "\uD83C\uDF81",
      category: "Activities"
    },
    {
      code: "U+1F397",
      name: "reminder ribbon",
      image: "\uD83C\uDF97",
      category: "Activities"
    },
    {
      code: "U+1F39F",
      name: "admission tickets",
      image: "\uD83C\uDF9F",
      category: "Activities"
    },
    {
      code: "U+1F3AB",
      name: "ticket",
      image: "\uD83C\uDFAB",
      category: "Activities"
    },
    {
      code: "U+1F396",
      name: "military medal",
      image: "\uD83C\uDF96",
      category: "Activities"
    },
    {
      code: "U+1F3C6",
      name: "trophy",
      image: "\uD83C\uDFC6",
      category: "Activities"
    },
    {
      code: "U+1F3C5",
      name: "sports medal",
      image: "\uD83C\uDFC5",
      category: "Activities"
    },
    {
      code: "U+1F947",
      name: "1st place medal",
      image: "\uD83E\uDD47",
      category: "Activities"
    },
    {
      code: "U+1F948",
      name: "2nd place medal",
      image: "\uD83E\uDD48",
      category: "Activities"
    },
    {
      code: "U+1F949",
      name: "3rd place medal",
      image: "\uD83E\uDD49",
      category: "Activities"
    },
    {
      code: "U+26BD",
      name: "soccer ball",
      image: "⚽",
      category: "Activities"
    },
    {
      code: "U+26BE",
      name: "baseball",
      image: "⚾",
      category: "Activities"
    },
    {
      code: "U+1F94E",
      name: "softball",
      image: "\uD83E\uDD4E",
      category: "Activities"
    },
    {
      code: "U+1F3C0",
      name: "basketball",
      image: "\uD83C\uDFC0",
      category: "Activities"
    },
    {
      code: "U+1F3D0",
      name: "volleyball",
      image: "\uD83C\uDFD0",
      category: "Activities"
    },
    {
      code: "U+1F3C8",
      name: "american football",
      image: "\uD83C\uDFC8",
      category: "Activities"
    },
    {
      code: "U+1F3C9",
      name: "rugby football",
      image: "\uD83C\uDFC9",
      category: "Activities"
    },
    {
      code: "U+1F3BE",
      name: "tennis",
      image: "\uD83C\uDFBE",
      category: "Activities"
    },
    {
      code: "U+1F94F",
      name: "flying disc",
      image: "\uD83E\uDD4F",
      category: "Activities"
    },
    {
      code: "U+1F3B3",
      name: "bowling",
      image: "\uD83C\uDFB3",
      category: "Activities"
    },
    {
      code: "U+1F3CF",
      name: "cricket game",
      image: "\uD83C\uDFCF",
      category: "Activities"
    },
    {
      code: "U+1F3D1",
      name: "field hockey",
      image: "\uD83C\uDFD1",
      category: "Activities"
    },
    {
      code: "U+1F3D2",
      name: "ice hockey",
      image: "\uD83C\uDFD2",
      category: "Activities"
    },
    {
      code: "U+1F94D",
      name: "lacrosse",
      image: "\uD83E\uDD4D",
      category: "Activities"
    },
    {
      code: "U+1F3D3",
      name: "ping pong",
      image: "\uD83C\uDFD3",
      category: "Activities"
    },
    {
      code: "U+1F3F8",
      name: "badminton",
      image: "\uD83C\uDFF8",
      category: "Activities"
    },
    {
      code: "U+1F94A",
      name: "boxing glove",
      image: "\uD83E\uDD4A",
      category: "Activities"
    },
    {
      code: "U+1F94B",
      name: "martial arts uniform",
      image: "\uD83E\uDD4B",
      category: "Activities"
    },
    {
      code: "U+1F945",
      name: "goal net",
      image: "\uD83E\uDD45",
      category: "Activities"
    },
    {
      code: "U+26F3",
      name: "flag in hole",
      image: "⛳",
      category: "Activities"
    },
    {
      code: "U+26F8",
      name: "ice skate",
      image: "⛸",
      category: "Activities"
    },
    {
      code: "U+1F3A3",
      name: "fishing pole",
      image: "\uD83C\uDFA3",
      category: "Activities"
    },
    {
      code: "U+1F93F",
      name: "diving mask",
      image: "\uD83E\uDD3F",
      category: "Activities"
    },
    {
      code: "U+1F3BD",
      name: "running shirt",
      image: "\uD83C\uDFBD",
      category: "Activities"
    },
    {
      code: "U+1F3BF",
      name: "skis",
      image: "\uD83C\uDFBF",
      category: "Activities"
    },
    {
      code: "U+1F6F7",
      name: "sled",
      image: "\uD83D\uDEF7",
      category: "Activities"
    },
    {
      code: "U+1F94C",
      name: "curling stone",
      image: "\uD83E\uDD4C",
      category: "Activities"
    },
    {
      code: "U+1F3AF",
      name: "bullseye",
      image: "\uD83C\uDFAF",
      category: "Activities"
    },
    {
      code: "U+1FA80",
      name: "yo-yo",
      image: "\uD83E\uDE80",
      category: "Activities"
    },
    {
      code: "U+1FA81",
      name: "kite",
      image: "\uD83E\uDE81",
      category: "Activities"
    },
    {
      code: "U+1F52B",
      name: "water pistol",
      image: "\uD83D\uDD2B",
      category: "Activities"
    },
    {
      code: "U+1F3B1",
      name: "pool 8 ball",
      image: "\uD83C\uDFB1",
      category: "Activities"
    },
    {
      code: "U+1F52E",
      name: "crystal ball",
      image: "\uD83D\uDD2E",
      category: "Activities"
    },
    {
      code: "U+1FA84",
      name: "magic wand",
      image: "\uD83E\uDE84",
      category: "Activities"
    },
    {
      code: "U+1F3AE",
      name: "video game",
      image: "\uD83C\uDFAE",
      category: "Activities"
    },
    {
      code: "U+1F579",
      name: "joystick",
      image: "\uD83D\uDD79",
      category: "Activities"
    },
    {
      code: "U+1F3B0",
      name: "slot machine",
      image: "\uD83C\uDFB0",
      category: "Activities"
    },
    {
      code: "U+1F3B2",
      name: "game die",
      image: "\uD83C\uDFB2",
      category: "Activities"
    },
    {
      code: "U+1F9E9",
      name: "puzzle piece",
      image: "\uD83E\uDDE9",
      category: "Activities"
    },
    {
      code: "U+1F9F8",
      name: "teddy bear",
      image: "\uD83E\uDDF8",
      category: "Activities"
    },
    {
      code: "U+1FA85",
      name: "piñata",
      image: "\uD83E\uDE85",
      category: "Activities"
    },
    {
      code: "U+1FAA9",
      name: "mirror ball",
      image: "\uD83E\uDEA9",
      category: "Activities"
    },
    {
      code: "U+1FA86",
      name: "nesting dolls",
      image: "\uD83E\uDE86",
      category: "Activities"
    },
    {
      code: "U+2660",
      name: "spade suit",
      image: "♠",
      category: "Activities"
    },
    {
      code: "U+2665",
      name: "heart suit",
      image: "♥",
      category: "Activities"
    },
    {
      code: "U+2666",
      name: "diamond suit",
      image: "♦",
      category: "Activities"
    },
    {
      code: "U+2663",
      name: "club suit",
      image: "♣",
      category: "Activities"
    },
    {
      code: "U+265F",
      name: "chess pawn",
      image: "♟",
      category: "Activities"
    },
    {
      code: "U+1F0CF",
      name: "joker",
      image: "\uD83C\uDCCF",
      category: "Activities"
    },
    {
      code: "U+1F004",
      name: "mahjong red dragon",
      image: "\uD83C\uDC04",
      category: "Activities"
    },
    {
      code: "U+1F3B4",
      name: "flower playing cards",
      image: "\uD83C\uDFB4",
      category: "Activities"
    },
    {
      code: "U+1F3AD",
      name: "performing arts",
      image: "\uD83C\uDFAD",
      category: "Activities"
    },
    {
      code: "U+1F5BC",
      name: "framed picture",
      image: "\uD83D\uDDBC",
      category: "Activities"
    },
    {
      code: "U+1F3A8",
      name: "artist palette",
      image: "\uD83C\uDFA8",
      category: "Activities"
    },
    {
      code: "U+1F9F5",
      name: "thread",
      image: "\uD83E\uDDF5",
      category: "Activities"
    },
    {
      code: "U+1FAA1",
      name: "sewing needle",
      image: "\uD83E\uDEA1",
      category: "Activities"
    },
    {
      code: "U+1F9F6",
      name: "yarn",
      image: "\uD83E\uDDF6",
      category: "Activities"
    },
    {
      code: "U+1FAA2",
      name: "knot",
      image: "\uD83E\uDEA2",
      category: "Activities"
    },
    {
      code: "U+1F453",
      name: "glasses",
      image: "\uD83D\uDC53",
      category: "Objects"
    },
    {
      code: "U+1F576",
      name: "sunglasses",
      image: "\uD83D\uDD76",
      category: "Objects"
    },
    {
      code: "U+1F97D",
      name: "goggles",
      image: "\uD83E\uDD7D",
      category: "Objects"
    },
    {
      code: "U+1F97C",
      name: "lab coat",
      image: "\uD83E\uDD7C",
      category: "Objects"
    },
    {
      code: "U+1F9BA",
      name: "safety vest",
      image: "\uD83E\uDDBA",
      category: "Objects"
    },
    {
      code: "U+1F454",
      name: "necktie",
      image: "\uD83D\uDC54",
      category: "Objects"
    },
    {
      code: "U+1F455",
      name: "t-shirt",
      image: "\uD83D\uDC55",
      category: "Objects"
    },
    {
      code: "U+1F456",
      name: "jeans",
      image: "\uD83D\uDC56",
      category: "Objects"
    },
    {
      code: "U+1F9E3",
      name: "scarf",
      image: "\uD83E\uDDE3",
      category: "Objects"
    },
    {
      code: "U+1F9E4",
      name: "gloves",
      image: "\uD83E\uDDE4",
      category: "Objects"
    },
    {
      code: "U+1F9E5",
      name: "coat",
      image: "\uD83E\uDDE5",
      category: "Objects"
    },
    {
      code: "U+1F9E6",
      name: "socks",
      image: "\uD83E\uDDE6",
      category: "Objects"
    },
    {
      code: "U+1F457",
      name: "dress",
      image: "\uD83D\uDC57",
      category: "Objects"
    },
    {
      code: "U+1F458",
      name: "kimono",
      image: "\uD83D\uDC58",
      category: "Objects"
    },
    {
      code: "U+1F97B",
      name: "sari",
      image: "\uD83E\uDD7B",
      category: "Objects"
    },
    {
      code: "U+1FA71",
      name: "one-piece swimsuit",
      image: "\uD83E\uDE71",
      category: "Objects"
    },
    {
      code: "U+1FA72",
      name: "briefs",
      image: "\uD83E\uDE72",
      category: "Objects"
    },
    {
      code: "U+1FA73",
      name: "shorts",
      image: "\uD83E\uDE73",
      category: "Objects"
    },
    {
      code: "U+1F459",
      name: "bikini",
      image: "\uD83D\uDC59",
      category: "Objects"
    },
    {
      code: "U+1F45A",
      name: "woman’s clothes",
      image: "\uD83D\uDC5A",
      category: "Objects"
    },
    {
      code: "U+1F45B",
      name: "purse",
      image: "\uD83D\uDC5B",
      category: "Objects"
    },
    {
      code: "U+1F45C",
      name: "handbag",
      image: "\uD83D\uDC5C",
      category: "Objects"
    },
    {
      code: "U+1F45D",
      name: "clutch bag",
      image: "\uD83D\uDC5D",
      category: "Objects"
    },
    {
      code: "U+1F6CD",
      name: "shopping bags",
      image: "\uD83D\uDECD",
      category: "Objects"
    },
    {
      code: "U+1F392",
      name: "backpack",
      image: "\uD83C\uDF92",
      category: "Objects"
    },
    {
      code: "U+1FA74",
      name: "thong sandal",
      image: "\uD83E\uDE74",
      category: "Objects"
    },
    {
      code: "U+1F45E",
      name: "man’s shoe",
      image: "\uD83D\uDC5E",
      category: "Objects"
    },
    {
      code: "U+1F45F",
      name: "running shoe",
      image: "\uD83D\uDC5F",
      category: "Objects"
    },
    {
      code: "U+1F97E",
      name: "hiking boot",
      image: "\uD83E\uDD7E",
      category: "Objects"
    },
    {
      code: "U+1F97F",
      name: "flat shoe",
      image: "\uD83E\uDD7F",
      category: "Objects"
    },
    {
      code: "U+1F460",
      name: "high-heeled shoe",
      image: "\uD83D\uDC60",
      category: "Objects"
    },
    {
      code: "U+1F461",
      name: "woman’s sandal",
      image: "\uD83D\uDC61",
      category: "Objects"
    },
    {
      code: "U+1FA70",
      name: "ballet shoes",
      image: "\uD83E\uDE70",
      category: "Objects"
    },
    {
      code: "U+1F462",
      name: "woman’s boot",
      image: "\uD83D\uDC62",
      category: "Objects"
    },
    {
      code: "U+1F451",
      name: "crown",
      image: "\uD83D\uDC51",
      category: "Objects"
    },
    {
      code: "U+1F452",
      name: "woman’s hat",
      image: "\uD83D\uDC52",
      category: "Objects"
    },
    {
      code: "U+1F3A9",
      name: "top hat",
      image: "\uD83C\uDFA9",
      category: "Objects"
    },
    {
      code: "U+1F393",
      name: "graduation cap",
      image: "\uD83C\uDF93",
      category: "Objects"
    },
    {
      code: "U+1F9E2",
      name: "billed cap",
      image: "\uD83E\uDDE2",
      category: "Objects"
    },
    {
      code: "U+1FA96",
      name: "military helmet",
      image: "\uD83E\uDE96",
      category: "Objects"
    },
    {
      code: "U+26D1",
      name: "rescue worker’s helmet",
      image: "⛑",
      category: "Objects"
    },
    {
      code: "U+1F4FF",
      name: "prayer beads",
      image: "\uD83D\uDCFF",
      category: "Objects"
    },
    {
      code: "U+1F484",
      name: "lipstick",
      image: "\uD83D\uDC84",
      category: "Objects"
    },
    {
      code: "U+1F48D",
      name: "ring",
      image: "\uD83D\uDC8D",
      category: "Objects"
    },
    {
      code: "U+1F48E",
      name: "gem stone",
      image: "\uD83D\uDC8E",
      category: "Objects"
    },
    {
      code: "U+1F507",
      name: "muted speaker",
      image: "\uD83D\uDD07",
      category: "Objects"
    },
    {
      code: "U+1F508",
      name: "speaker low volume",
      image: "\uD83D\uDD08",
      category: "Objects"
    },
    {
      code: "U+1F509",
      name: "speaker medium volume",
      image: "\uD83D\uDD09",
      category: "Objects"
    },
    {
      code: "U+1F50A",
      name: "speaker high volume",
      image: "\uD83D\uDD0A",
      category: "Objects"
    },
    {
      code: "U+1F4E2",
      name: "loudspeaker",
      image: "\uD83D\uDCE2",
      category: "Objects"
    },
    {
      code: "U+1F4E3",
      name: "megaphone",
      image: "\uD83D\uDCE3",
      category: "Objects"
    },
    {
      code: "U+1F4EF",
      name: "postal horn",
      image: "\uD83D\uDCEF",
      category: "Objects"
    },
    {
      code: "U+1F514",
      name: "bell",
      image: "\uD83D\uDD14",
      category: "Objects"
    },
    {
      code: "U+1F515",
      name: "bell with slash",
      image: "\uD83D\uDD15",
      category: "Objects"
    },
    {
      code: "U+1F3BC",
      name: "musical score",
      image: "\uD83C\uDFBC",
      category: "Objects"
    },
    {
      code: "U+1F3B5",
      name: "musical note",
      image: "\uD83C\uDFB5",
      category: "Objects"
    },
    {
      code: "U+1F3B6",
      name: "musical notes",
      image: "\uD83C\uDFB6",
      category: "Objects"
    },
    {
      code: "U+1F399",
      name: "studio microphone",
      image: "\uD83C\uDF99",
      category: "Objects"
    },
    {
      code: "U+1F39A",
      name: "level slider",
      image: "\uD83C\uDF9A",
      category: "Objects"
    },
    {
      code: "U+1F39B",
      name: "control knobs",
      image: "\uD83C\uDF9B",
      category: "Objects"
    },
    {
      code: "U+1F3A4",
      name: "microphone",
      image: "\uD83C\uDFA4",
      category: "Objects"
    },
    {
      code: "U+1F3A7",
      name: "headphone",
      image: "\uD83C\uDFA7",
      category: "Objects"
    },
    {
      code: "U+1F4FB",
      name: "radio",
      image: "\uD83D\uDCFB",
      category: "Objects"
    },
    {
      code: "U+1F3B7",
      name: "saxophone",
      image: "\uD83C\uDFB7",
      category: "Objects"
    },
    {
      code: "U+1FA97",
      name: "accordion",
      image: "\uD83E\uDE97",
      category: "Objects"
    },
    {
      code: "U+1F3B8",
      name: "guitar",
      image: "\uD83C\uDFB8",
      category: "Objects"
    },
    {
      code: "U+1F3B9",
      name: "musical keyboard",
      image: "\uD83C\uDFB9",
      category: "Objects"
    },
    {
      code: "U+1F3BA",
      name: "trumpet",
      image: "\uD83C\uDFBA",
      category: "Objects"
    },
    {
      code: "U+1F3BB",
      name: "violin",
      image: "\uD83C\uDFBB",
      category: "Objects"
    },
    {
      code: "U+1FA95",
      name: "banjo",
      image: "\uD83E\uDE95",
      category: "Objects"
    },
    {
      code: "U+1F941",
      name: "drum",
      image: "\uD83E\uDD41",
      category: "Objects"
    },
    {
      code: "U+1FA98",
      name: "long drum",
      image: "\uD83E\uDE98",
      category: "Objects"
    },
    {
      code: "U+1F4F1",
      name: "mobile phone",
      image: "\uD83D\uDCF1",
      category: "Objects"
    },
    {
      code: "U+1F4F2",
      name: "mobile phone with arrow",
      image: "\uD83D\uDCF2",
      category: "Objects"
    },
    {
      code: "U+260E",
      name: "telephone",
      image: "☎",
      category: "Objects"
    },
    {
      code: "U+1F4DE",
      name: "telephone receiver",
      image: "\uD83D\uDCDE",
      category: "Objects"
    },
    {
      code: "U+1F4DF",
      name: "pager",
      image: "\uD83D\uDCDF",
      category: "Objects"
    },
    {
      code: "U+1F4E0",
      name: "fax machine",
      image: "\uD83D\uDCE0",
      category: "Objects"
    },
    {
      code: "U+1F50B",
      name: "battery",
      image: "\uD83D\uDD0B",
      category: "Objects"
    },
    {
      code: "U+1FAAB",
      name: "low battery",
      image: "\uD83E\uDEAB",
      category: "Objects"
    },
    {
      code: "U+1F50C",
      name: "electric plug",
      image: "\uD83D\uDD0C",
      category: "Objects"
    },
    {
      code: "U+1F4BB",
      name: "laptop",
      image: "\uD83D\uDCBB",
      category: "Objects"
    },
    {
      code: "U+1F5A5",
      name: "desktop computer",
      image: "\uD83D\uDDA5",
      category: "Objects"
    },
    {
      code: "U+1F5A8",
      name: "printer",
      image: "\uD83D\uDDA8",
      category: "Objects"
    },
    {
      code: "U+2328",
      name: "keyboard",
      image: "⌨",
      category: "Objects"
    },
    {
      code: "U+1F5B1",
      name: "computer mouse",
      image: "\uD83D\uDDB1",
      category: "Objects"
    },
    {
      code: "U+1F5B2",
      name: "trackball",
      image: "\uD83D\uDDB2",
      category: "Objects"
    },
    {
      code: "U+1F4BD",
      name: "computer disk",
      image: "\uD83D\uDCBD",
      category: "Objects"
    },
    {
      code: "U+1F4BE",
      name: "floppy disk",
      image: "\uD83D\uDCBE",
      category: "Objects"
    },
    {
      code: "U+1F4BF",
      name: "optical disk",
      image: "\uD83D\uDCBF",
      category: "Objects"
    },
    {
      code: "U+1F4C0",
      name: "dvd",
      image: "\uD83D\uDCC0",
      category: "Objects"
    },
    {
      code: "U+1F9EE",
      name: "abacus",
      image: "\uD83E\uDDEE",
      category: "Objects"
    },
    {
      code: "U+1F3A5",
      name: "movie camera",
      image: "\uD83C\uDFA5",
      category: "Objects"
    },
    {
      code: "U+1F39E",
      name: "film frames",
      image: "\uD83C\uDF9E",
      category: "Objects"
    },
    {
      code: "U+1F4FD",
      name: "film projector",
      image: "\uD83D\uDCFD",
      category: "Objects"
    },
    {
      code: "U+1F3AC",
      name: "clapper board",
      image: "\uD83C\uDFAC",
      category: "Objects"
    },
    {
      code: "U+1F4FA",
      name: "television",
      image: "\uD83D\uDCFA",
      category: "Objects"
    },
    {
      code: "U+1F4F7",
      name: "camera",
      image: "\uD83D\uDCF7",
      category: "Objects"
    },
    {
      code: "U+1F4F8",
      name: "camera with flash",
      image: "\uD83D\uDCF8",
      category: "Objects"
    },
    {
      code: "U+1F4F9",
      name: "video camera",
      image: "\uD83D\uDCF9",
      category: "Objects"
    },
    {
      code: "U+1F4FC",
      name: "videocassette",
      image: "\uD83D\uDCFC",
      category: "Objects"
    },
    {
      code: "U+1F50D",
      name: "magnifying glass tilted left",
      image: "\uD83D\uDD0D",
      category: "Objects"
    },
    {
      code: "U+1F50E",
      name: "magnifying glass tilted right",
      image: "\uD83D\uDD0E",
      category: "Objects"
    },
    {
      code: "U+1F56F",
      name: "candle",
      image: "\uD83D\uDD6F",
      category: "Objects"
    },
    {
      code: "U+1F4A1",
      name: "light bulb",
      image: "\uD83D\uDCA1",
      category: "Objects"
    },
    {
      code: "U+1F526",
      name: "flashlight",
      image: "\uD83D\uDD26",
      category: "Objects"
    },
    {
      code: "U+1F3EE",
      name: "red paper lantern",
      image: "\uD83C\uDFEE",
      category: "Objects"
    },
    {
      code: "U+1FA94",
      name: "diya lamp",
      image: "\uD83E\uDE94",
      category: "Objects"
    },
    {
      code: "U+1F4D4",
      name: "notebook with decorative cover",
      image: "\uD83D\uDCD4",
      category: "Objects"
    },
    {
      code: "U+1F4D5",
      name: "closed book",
      image: "\uD83D\uDCD5",
      category: "Objects"
    },
    {
      code: "U+1F4D6",
      name: "open book",
      image: "\uD83D\uDCD6",
      category: "Objects"
    },
    {
      code: "U+1F4D7",
      name: "green book",
      image: "\uD83D\uDCD7",
      category: "Objects"
    },
    {
      code: "U+1F4D8",
      name: "blue book",
      image: "\uD83D\uDCD8",
      category: "Objects"
    },
    {
      code: "U+1F4D9",
      name: "orange book",
      image: "\uD83D\uDCD9",
      category: "Objects"
    },
    {
      code: "U+1F4DA",
      name: "books",
      image: "\uD83D\uDCDA",
      category: "Objects"
    },
    {
      code: "U+1F4D3",
      name: "notebook",
      image: "\uD83D\uDCD3",
      category: "Objects"
    },
    {
      code: "U+1F4D2",
      name: "ledger",
      image: "\uD83D\uDCD2",
      category: "Objects"
    },
    {
      code: "U+1F4C3",
      name: "page with curl",
      image: "\uD83D\uDCC3",
      category: "Objects"
    },
    {
      code: "U+1F4DC",
      name: "scroll",
      image: "\uD83D\uDCDC",
      category: "Objects"
    },
    {
      code: "U+1F4C4",
      name: "page facing up",
      image: "\uD83D\uDCC4",
      category: "Objects"
    },
    {
      code: "U+1F4F0",
      name: "newspaper",
      image: "\uD83D\uDCF0",
      category: "Objects"
    },
    {
      code: "U+1F5DE",
      name: "rolled-up newspaper",
      image: "\uD83D\uDDDE",
      category: "Objects"
    },
    {
      code: "U+1F4D1",
      name: "bookmark tabs",
      image: "\uD83D\uDCD1",
      category: "Objects"
    },
    {
      code: "U+1F516",
      name: "bookmark",
      image: "\uD83D\uDD16",
      category: "Objects"
    },
    {
      code: "U+1F3F7",
      name: "label",
      image: "\uD83C\uDFF7",
      category: "Objects"
    },
    {
      code: "U+1F4B0",
      name: "money bag",
      image: "\uD83D\uDCB0",
      category: "Objects"
    },
    {
      code: "U+1FA99",
      name: "coin",
      image: "\uD83E\uDE99",
      category: "Objects"
    },
    {
      code: "U+1F4B4",
      name: "yen banknote",
      image: "\uD83D\uDCB4",
      category: "Objects"
    },
    {
      code: "U+1F4B5",
      name: "dollar banknote",
      image: "\uD83D\uDCB5",
      category: "Objects"
    },
    {
      code: "U+1F4B6",
      name: "euro banknote",
      image: "\uD83D\uDCB6",
      category: "Objects"
    },
    {
      code: "U+1F4B7",
      name: "pound banknote",
      image: "\uD83D\uDCB7",
      category: "Objects"
    },
    {
      code: "U+1F4B8",
      name: "money with wings",
      image: "\uD83D\uDCB8",
      category: "Objects"
    },
    {
      code: "U+1F4B3",
      name: "credit card",
      image: "\uD83D\uDCB3",
      category: "Objects"
    },
    {
      code: "U+1F9FE",
      name: "receipt",
      image: "\uD83E\uDDFE",
      category: "Objects"
    },
    {
      code: "U+1F4B9",
      name: "chart increasing with yen",
      image: "\uD83D\uDCB9",
      category: "Objects"
    },
    {
      code: "U+2709",
      name: "envelope",
      image: "✉",
      category: "Objects"
    },
    {
      code: "U+1F4E7",
      name: "e-mail",
      image: "\uD83D\uDCE7",
      category: "Objects"
    },
    {
      code: "U+1F4E8",
      name: "incoming envelope",
      image: "\uD83D\uDCE8",
      category: "Objects"
    },
    {
      code: "U+1F4E9",
      name: "envelope with arrow",
      image: "\uD83D\uDCE9",
      category: "Objects"
    },
    {
      code: "U+1F4E4",
      name: "outbox tray",
      image: "\uD83D\uDCE4",
      category: "Objects"
    },
    {
      code: "U+1F4E5",
      name: "inbox tray",
      image: "\uD83D\uDCE5",
      category: "Objects"
    },
    {
      code: "U+1F4E6",
      name: "package",
      image: "\uD83D\uDCE6",
      category: "Objects"
    },
    {
      code: "U+1F4EB",
      name: "closed mailbox with raised flag",
      image: "\uD83D\uDCEB",
      category: "Objects"
    },
    {
      code: "U+1F4EA",
      name: "closed mailbox with lowered flag",
      image: "\uD83D\uDCEA",
      category: "Objects"
    },
    {
      code: "U+1F4EC",
      name: "open mailbox with raised flag",
      image: "\uD83D\uDCEC",
      category: "Objects"
    },
    {
      code: "U+1F4ED",
      name: "open mailbox with lowered flag",
      image: "\uD83D\uDCED",
      category: "Objects"
    },
    {
      code: "U+1F4EE",
      name: "postbox",
      image: "\uD83D\uDCEE",
      category: "Objects"
    },
    {
      code: "U+1F5F3",
      name: "ballot box with ballot",
      image: "\uD83D\uDDF3",
      category: "Objects"
    },
    {
      code: "U+270F",
      name: "pencil",
      image: "✏",
      category: "Objects"
    },
    {
      code: "U+2712",
      name: "black nib",
      image: "✒",
      category: "Objects"
    },
    {
      code: "U+1F58B",
      name: "fountain pen",
      image: "\uD83D\uDD8B",
      category: "Objects"
    },
    {
      code: "U+1F58A",
      name: "pen",
      image: "\uD83D\uDD8A",
      category: "Objects"
    },
    {
      code: "U+1F58C",
      name: "paintbrush",
      image: "\uD83D\uDD8C",
      category: "Objects"
    },
    {
      code: "U+1F58D",
      name: "crayon",
      image: "\uD83D\uDD8D",
      category: "Objects"
    },
    {
      code: "U+1F4DD",
      name: "memo",
      image: "\uD83D\uDCDD",
      category: "Objects"
    },
    {
      code: "U+1F4BC",
      name: "briefcase",
      image: "\uD83D\uDCBC",
      category: "Objects"
    },
    {
      code: "U+1F4C1",
      name: "file folder",
      image: "\uD83D\uDCC1",
      category: "Objects"
    },
    {
      code: "U+1F4C2",
      name: "open file folder",
      image: "\uD83D\uDCC2",
      category: "Objects"
    },
    {
      code: "U+1F5C2",
      name: "card index dividers",
      image: "\uD83D\uDDC2",
      category: "Objects"
    },
    {
      code: "U+1F4C5",
      name: "calendar",
      image: "\uD83D\uDCC5",
      category: "Objects"
    },
    {
      code: "U+1F4C6",
      name: "tear-off calendar",
      image: "\uD83D\uDCC6",
      category: "Objects"
    },
    {
      code: "U+1F5D2",
      name: "spiral notepad",
      image: "\uD83D\uDDD2",
      category: "Objects"
    },
    {
      code: "U+1F5D3",
      name: "spiral calendar",
      image: "\uD83D\uDDD3",
      category: "Objects"
    },
    {
      code: "U+1F4C7",
      name: "card index",
      image: "\uD83D\uDCC7",
      category: "Objects"
    },
    {
      code: "U+1F4C8",
      name: "chart increasing",
      image: "\uD83D\uDCC8",
      category: "Objects"
    },
    {
      code: "U+1F4C9",
      name: "chart decreasing",
      image: "\uD83D\uDCC9",
      category: "Objects"
    },
    {
      code: "U+1F4CA",
      name: "bar chart",
      image: "\uD83D\uDCCA",
      category: "Objects"
    },
    {
      code: "U+1F4CB",
      name: "clipboard",
      image: "\uD83D\uDCCB",
      category: "Objects"
    },
    {
      code: "U+1F4CC",
      name: "pushpin",
      image: "\uD83D\uDCCC",
      category: "Objects"
    },
    {
      code: "U+1F4CD",
      name: "round pushpin",
      image: "\uD83D\uDCCD",
      category: "Objects"
    },
    {
      code: "U+1F4CE",
      name: "paperclip",
      image: "\uD83D\uDCCE",
      category: "Objects"
    },
    {
      code: "U+1F587",
      name: "linked paperclips",
      image: "\uD83D\uDD87",
      category: "Objects"
    },
    {
      code: "U+1F4CF",
      name: "straight ruler",
      image: "\uD83D\uDCCF",
      category: "Objects"
    },
    {
      code: "U+1F4D0",
      name: "triangular ruler",
      image: "\uD83D\uDCD0",
      category: "Objects"
    },
    {
      code: "U+2702",
      name: "scissors",
      image: "✂",
      category: "Objects"
    },
    {
      code: "U+1F5C3",
      name: "card file box",
      image: "\uD83D\uDDC3",
      category: "Objects"
    },
    {
      code: "U+1F5C4",
      name: "file cabinet",
      image: "\uD83D\uDDC4",
      category: "Objects"
    },
    {
      code: "U+1F5D1",
      name: "wastebasket",
      image: "\uD83D\uDDD1",
      category: "Objects"
    },
    {
      code: "U+1F512",
      name: "locked",
      image: "\uD83D\uDD12",
      category: "Objects"
    },
    {
      code: "U+1F513",
      name: "unlocked",
      image: "\uD83D\uDD13",
      category: "Objects"
    },
    {
      code: "U+1F50F",
      name: "locked with pen",
      image: "\uD83D\uDD0F",
      category: "Objects"
    },
    {
      code: "U+1F510",
      name: "locked with key",
      image: "\uD83D\uDD10",
      category: "Objects"
    },
    {
      code: "U+1F511",
      name: "key",
      image: "\uD83D\uDD11",
      category: "Objects"
    },
    {
      code: "U+1F5DD",
      name: "old key",
      image: "\uD83D\uDDDD",
      category: "Objects"
    },
    {
      code: "U+1F528",
      name: "hammer",
      image: "\uD83D\uDD28",
      category: "Objects"
    },
    {
      code: "U+1FA93",
      name: "axe",
      image: "\uD83E\uDE93",
      category: "Objects"
    },
    {
      code: "U+26CF",
      name: "pick",
      image: "⛏",
      category: "Objects"
    },
    {
      code: "U+2692",
      name: "hammer and pick",
      image: "⚒",
      category: "Objects"
    },
    {
      code: "U+1F6E0",
      name: "hammer and wrench",
      image: "\uD83D\uDEE0",
      category: "Objects"
    },
    {
      code: "U+1F5E1",
      name: "dagger",
      image: "\uD83D\uDDE1",
      category: "Objects"
    },
    {
      code: "U+2694",
      name: "crossed swords",
      image: "⚔",
      category: "Objects"
    },
    {
      code: "U+1F4A3",
      name: "bomb",
      image: "\uD83D\uDCA3",
      category: "Objects"
    },
    {
      code: "U+1FA83",
      name: "boomerang",
      image: "\uD83E\uDE83",
      category: "Objects"
    },
    {
      code: "U+1F3F9",
      name: "bow and arrow",
      image: "\uD83C\uDFF9",
      category: "Objects"
    },
    {
      code: "U+1F6E1",
      name: "shield",
      image: "\uD83D\uDEE1",
      category: "Objects"
    },
    {
      code: "U+1FA9A",
      name: "carpentry saw",
      image: "\uD83E\uDE9A",
      category: "Objects"
    },
    {
      code: "U+1F527",
      name: "wrench",
      image: "\uD83D\uDD27",
      category: "Objects"
    },
    {
      code: "U+1FA9B",
      name: "screwdriver",
      image: "\uD83E\uDE9B",
      category: "Objects"
    },
    {
      code: "U+1F529",
      name: "nut and bolt",
      image: "\uD83D\uDD29",
      category: "Objects"
    },
    {
      code: "U+2699",
      name: "gear",
      image: "⚙",
      category: "Objects"
    },
    {
      code: "U+1F5DC",
      name: "clamp",
      image: "\uD83D\uDDDC",
      category: "Objects"
    },
    {
      code: "U+2696",
      name: "balance scale",
      image: "⚖",
      category: "Objects"
    },
    {
      code: "U+1F9AF",
      name: "white cane",
      image: "\uD83E\uDDAF",
      category: "Objects"
    },
    {
      code: "U+1F517",
      name: "link",
      image: "\uD83D\uDD17",
      category: "Objects"
    },
    {
      code: "U+26D3",
      name: "chains",
      image: "⛓",
      category: "Objects"
    },
    {
      code: "U+1FA9D",
      name: "hook",
      image: "\uD83E\uDE9D",
      category: "Objects"
    },
    {
      code: "U+1F9F0",
      name: "toolbox",
      image: "\uD83E\uDDF0",
      category: "Objects"
    },
    {
      code: "U+1F9F2",
      name: "magnet",
      image: "\uD83E\uDDF2",
      category: "Objects"
    },
    {
      code: "U+1FA9C",
      name: "ladder",
      image: "\uD83E\uDE9C",
      category: "Objects"
    },
    {
      code: "U+2697",
      name: "alembic",
      image: "⚗",
      category: "Objects"
    },
    {
      code: "U+1F9EA",
      name: "test tube",
      image: "\uD83E\uDDEA",
      category: "Objects"
    },
    {
      code: "U+1F9EB",
      name: "petri dish",
      image: "\uD83E\uDDEB",
      category: "Objects"
    },
    {
      code: "U+1F9EC",
      name: "dna",
      image: "\uD83E\uDDEC",
      category: "Objects"
    },
    {
      code: "U+1F52C",
      name: "microscope",
      image: "\uD83D\uDD2C",
      category: "Objects"
    },
    {
      code: "U+1F52D",
      name: "telescope",
      image: "\uD83D\uDD2D",
      category: "Objects"
    },
    {
      code: "U+1F4E1",
      name: "satellite antenna",
      image: "\uD83D\uDCE1",
      category: "Objects"
    },
    {
      code: "U+1F489",
      name: "syringe",
      image: "\uD83D\uDC89",
      category: "Objects"
    },
    {
      code: "U+1FA78",
      name: "drop of blood",
      image: "\uD83E\uDE78",
      category: "Objects"
    },
    {
      code: "U+1F48A",
      name: "pill",
      image: "\uD83D\uDC8A",
      category: "Objects"
    },
    {
      code: "U+1FA79",
      name: "adhesive bandage",
      image: "\uD83E\uDE79",
      category: "Objects"
    },
    {
      code: "U+1FA7C",
      name: "crutch",
      image: "\uD83E\uDE7C",
      category: "Objects"
    },
    {
      code: "U+1FA7A",
      name: "stethoscope",
      image: "\uD83E\uDE7A",
      category: "Objects"
    },
    {
      code: "U+1FA7B",
      name: "x-ray",
      image: "\uD83E\uDE7B",
      category: "Objects"
    },
    {
      code: "U+1F6AA",
      name: "door",
      image: "\uD83D\uDEAA",
      category: "Objects"
    },
    {
      code: "U+1F6D7",
      name: "elevator",
      image: "\uD83D\uDED7",
      category: "Objects"
    },
    {
      code: "U+1FA9E",
      name: "mirror",
      image: "\uD83E\uDE9E",
      category: "Objects"
    },
    {
      code: "U+1FA9F",
      name: "window",
      image: "\uD83E\uDE9F",
      category: "Objects"
    },
    {
      code: "U+1F6CF",
      name: "bed",
      image: "\uD83D\uDECF",
      category: "Objects"
    },
    {
      code: "U+1F6CB",
      name: "couch and lamp",
      image: "\uD83D\uDECB",
      category: "Objects"
    },
    {
      code: "U+1FA91",
      name: "chair",
      image: "\uD83E\uDE91",
      category: "Objects"
    },
    {
      code: "U+1F6BD",
      name: "toilet",
      image: "\uD83D\uDEBD",
      category: "Objects"
    },
    {
      code: "U+1FAA0",
      name: "plunger",
      image: "\uD83E\uDEA0",
      category: "Objects"
    },
    {
      code: "U+1F6BF",
      name: "shower",
      image: "\uD83D\uDEBF",
      category: "Objects"
    },
    {
      code: "U+1F6C1",
      name: "bathtub",
      image: "\uD83D\uDEC1",
      category: "Objects"
    },
    {
      code: "U+1FAA4",
      name: "mouse trap",
      image: "\uD83E\uDEA4",
      category: "Objects"
    },
    {
      code: "U+1FA92",
      name: "razor",
      image: "\uD83E\uDE92",
      category: "Objects"
    },
    {
      code: "U+1F9F4",
      name: "lotion bottle",
      image: "\uD83E\uDDF4",
      category: "Objects"
    },
    {
      code: "U+1F9F7",
      name: "safety pin",
      image: "\uD83E\uDDF7",
      category: "Objects"
    },
    {
      code: "U+1F9F9",
      name: "broom",
      image: "\uD83E\uDDF9",
      category: "Objects"
    },
    {
      code: "U+1F9FA",
      name: "basket",
      image: "\uD83E\uDDFA",
      category: "Objects"
    },
    {
      code: "U+1F9FB",
      name: "roll of paper",
      image: "\uD83E\uDDFB",
      category: "Objects"
    },
    {
      code: "U+1FAA3",
      name: "bucket",
      image: "\uD83E\uDEA3",
      category: "Objects"
    },
    {
      code: "U+1F9FC",
      name: "soap",
      image: "\uD83E\uDDFC",
      category: "Objects"
    },
    {
      code: "U+1FAE7",
      name: "bubbles",
      image: "\uD83E\uDEE7",
      category: "Objects"
    },
    {
      code: "U+1FAA5",
      name: "toothbrush",
      image: "\uD83E\uDEA5",
      category: "Objects"
    },
    {
      code: "U+1F9FD",
      name: "sponge",
      image: "\uD83E\uDDFD",
      category: "Objects"
    },
    {
      code: "U+1F9EF",
      name: "fire extinguisher",
      image: "\uD83E\uDDEF",
      category: "Objects"
    },
    {
      code: "U+1F6D2",
      name: "shopping cart",
      image: "\uD83D\uDED2",
      category: "Objects"
    },
    {
      code: "U+1F6AC",
      name: "cigarette",
      image: "\uD83D\uDEAC",
      category: "Objects"
    },
    {
      code: "U+26B0",
      name: "coffin",
      image: "⚰",
      category: "Objects"
    },
    {
      code: "U+1FAA6",
      name: "headstone",
      image: "\uD83E\uDEA6",
      category: "Objects"
    },
    {
      code: "U+26B1",
      name: "funeral urn",
      image: "⚱",
      category: "Objects"
    },
    {
      code: "U+1F9FF",
      name: "nazar amulet",
      image: "\uD83E\uDDFF",
      category: "Objects"
    },
    {
      code: "U+1FAAC",
      name: "hamsa",
      image: "\uD83E\uDEAC",
      category: "Objects"
    },
    {
      code: "U+1F5FF",
      name: "moai",
      image: "\uD83D\uDDFF",
      category: "Objects"
    },
    {
      code: "U+1FAA7",
      name: "placard",
      image: "\uD83E\uDEA7",
      category: "Objects"
    },
    {
      code: "U+1FAAA",
      name: "identification card",
      image: "\uD83E\uDEAA",
      category: "Objects"
    },
    {
      code: "U+1F3E7",
      name: "ATM sign",
      image: "\uD83C\uDFE7",
      category: "Symbols"
    },
    {
      code: "U+1F6AE",
      name: "litter in bin sign",
      image: "\uD83D\uDEAE",
      category: "Symbols"
    },
    {
      code: "U+1F6B0",
      name: "potable water",
      image: "\uD83D\uDEB0",
      category: "Symbols"
    },
    {
      code: "U+267F",
      name: "wheelchair symbol",
      image: "♿",
      category: "Symbols"
    },
    {
      code: "U+1F6B9",
      name: "men’s room",
      image: "\uD83D\uDEB9",
      category: "Symbols"
    },
    {
      code: "U+1F6BA",
      name: "women’s room",
      image: "\uD83D\uDEBA",
      category: "Symbols"
    },
    {
      code: "U+1F6BB",
      name: "restroom",
      image: "\uD83D\uDEBB",
      category: "Symbols"
    },
    {
      code: "U+1F6BC",
      name: "baby symbol",
      image: "\uD83D\uDEBC",
      category: "Symbols"
    },
    {
      code: "U+1F6BE",
      name: "water closet",
      image: "\uD83D\uDEBE",
      category: "Symbols"
    },
    {
      code: "U+1F6C2",
      name: "passport control",
      image: "\uD83D\uDEC2",
      category: "Symbols"
    },
    {
      code: "U+1F6C3",
      name: "customs",
      image: "\uD83D\uDEC3",
      category: "Symbols"
    },
    {
      code: "U+1F6C4",
      name: "baggage claim",
      image: "\uD83D\uDEC4",
      category: "Symbols"
    },
    {
      code: "U+1F6C5",
      name: "left luggage",
      image: "\uD83D\uDEC5",
      category: "Symbols"
    },
    {
      code: "U+26A0",
      name: "warning",
      image: "⚠",
      category: "Symbols"
    },
    {
      code: "U+1F6B8",
      name: "children crossing",
      image: "\uD83D\uDEB8",
      category: "Symbols"
    },
    {
      code: "U+26D4",
      name: "no entry",
      image: "⛔",
      category: "Symbols"
    },
    {
      code: "U+1F6AB",
      name: "prohibited",
      image: "\uD83D\uDEAB",
      category: "Symbols"
    },
    {
      code: "U+1F6B3",
      name: "no bicycles",
      image: "\uD83D\uDEB3",
      category: "Symbols"
    },
    {
      code: "U+1F6AD",
      name: "no smoking",
      image: "\uD83D\uDEAD",
      category: "Symbols"
    },
    {
      code: "U+1F6AF",
      name: "no littering",
      image: "\uD83D\uDEAF",
      category: "Symbols"
    },
    {
      code: "U+1F6B1",
      name: "non-potable water",
      image: "\uD83D\uDEB1",
      category: "Symbols"
    },
    {
      code: "U+1F6B7",
      name: "no pedestrians",
      image: "\uD83D\uDEB7",
      category: "Symbols"
    },
    {
      code: "U+1F4F5",
      name: "no mobile phones",
      image: "\uD83D\uDCF5",
      category: "Symbols"
    },
    {
      code: "U+1F51E",
      name: "no one under eighteen",
      image: "\uD83D\uDD1E",
      category: "Symbols"
    },
    {
      code: "U+2622",
      name: "radioactive",
      image: "☢",
      category: "Symbols"
    },
    {
      code: "U+2623",
      name: "biohazard",
      image: "☣",
      category: "Symbols"
    },
    {
      code: "U+2B06",
      name: "up arrow",
      image: "⬆",
      category: "Symbols"
    },
    {
      code: "U+2197",
      name: "up-right arrow",
      image: "↗",
      category: "Symbols"
    },
    {
      code: "U+27A1",
      name: "right arrow",
      image: "➡",
      category: "Symbols"
    },
    {
      code: "U+2198",
      name: "down-right arrow",
      image: "↘",
      category: "Symbols"
    },
    {
      code: "U+2B07",
      name: "down arrow",
      image: "⬇",
      category: "Symbols"
    },
    {
      code: "U+2199",
      name: "down-left arrow",
      image: "↙",
      category: "Symbols"
    },
    {
      code: "U+2B05",
      name: "left arrow",
      image: "⬅",
      category: "Symbols"
    },
    {
      code: "U+2196",
      name: "up-left arrow",
      image: "↖",
      category: "Symbols"
    },
    {
      code: "U+2195",
      name: "up-down arrow",
      image: "↕",
      category: "Symbols"
    },
    {
      code: "U+2194",
      name: "left-right arrow",
      image: "↔",
      category: "Symbols"
    },
    {
      code: "U+21A9",
      name: "right arrow curving left",
      image: "↩",
      category: "Symbols"
    },
    {
      code: "U+21AA",
      name: "left arrow curving right",
      image: "↪",
      category: "Symbols"
    },
    {
      code: "U+2934",
      name: "right arrow curving up",
      image: "⤴",
      category: "Symbols"
    },
    {
      code: "U+2935",
      name: "right arrow curving down",
      image: "⤵",
      category: "Symbols"
    },
    {
      code: "U+1F503",
      name: "clockwise vertical arrows",
      image: "\uD83D\uDD03",
      category: "Symbols"
    },
    {
      code: "U+1F504",
      name: "counterclockwise arrows button",
      image: "\uD83D\uDD04",
      category: "Symbols"
    },
    {
      code: "U+1F519",
      name: "BACK arrow",
      image: "\uD83D\uDD19",
      category: "Symbols"
    },
    {
      code: "U+1F51A",
      name: "END arrow",
      image: "\uD83D\uDD1A",
      category: "Symbols"
    },
    {
      code: "U+1F51B",
      name: "ON! arrow",
      image: "\uD83D\uDD1B",
      category: "Symbols"
    },
    {
      code: "U+1F51C",
      name: "SOON arrow",
      image: "\uD83D\uDD1C",
      category: "Symbols"
    },
    {
      code: "U+1F51D",
      name: "TOP arrow",
      image: "\uD83D\uDD1D",
      category: "Symbols"
    },
    {
      code: "U+1F6D0",
      name: "place of worship",
      image: "\uD83D\uDED0",
      category: "Symbols"
    },
    {
      code: "U+269B",
      name: "atom symbol",
      image: "⚛",
      category: "Symbols"
    },
    {
      code: "U+1F549",
      name: "om",
      image: "\uD83D\uDD49",
      category: "Symbols"
    },
    {
      code: "U+2721",
      name: "star of David",
      image: "✡",
      category: "Symbols"
    },
    {
      code: "U+2638",
      name: "wheel of dharma",
      image: "☸",
      category: "Symbols"
    },
    {
      code: "U+262F",
      name: "yin yang",
      image: "☯",
      category: "Symbols"
    },
    {
      code: "U+271D",
      name: "latin cross",
      image: "✝",
      category: "Symbols"
    },
    {
      code: "U+2626",
      name: "orthodox cross",
      image: "☦",
      category: "Symbols"
    },
    {
      code: "U+262A",
      name: "star and crescent",
      image: "☪",
      category: "Symbols"
    },
    {
      code: "U+262E",
      name: "peace symbol",
      image: "☮",
      category: "Symbols"
    },
    {
      code: "U+1F54E",
      name: "menorah",
      image: "\uD83D\uDD4E",
      category: "Symbols"
    },
    {
      code: "U+1F52F",
      name: "dotted six-pointed star",
      image: "\uD83D\uDD2F",
      category: "Symbols"
    },
    {
      code: "U+2648",
      name: "Aries",
      image: "♈",
      category: "Symbols"
    },
    {
      code: "U+2649",
      name: "Taurus",
      image: "♉",
      category: "Symbols"
    },
    {
      code: "U+264A",
      name: "Gemini",
      image: "♊",
      category: "Symbols"
    },
    {
      code: "U+264B",
      name: "Cancer",
      image: "♋",
      category: "Symbols"
    },
    {
      code: "U+264C",
      name: "Leo",
      image: "♌",
      category: "Symbols"
    },
    {
      code: "U+264D",
      name: "Virgo",
      image: "♍",
      category: "Symbols"
    },
    {
      code: "U+264E",
      name: "Libra",
      image: "♎",
      category: "Symbols"
    },
    {
      code: "U+264F",
      name: "Scorpio",
      image: "♏",
      category: "Symbols"
    },
    {
      code: "U+2650",
      name: "Sagittarius",
      image: "♐",
      category: "Symbols"
    },
    {
      code: "U+2651",
      name: "Capricorn",
      image: "♑",
      category: "Symbols"
    },
    {
      code: "U+2652",
      name: "Aquarius",
      image: "♒",
      category: "Symbols"
    },
    {
      code: "U+2653",
      name: "Pisces",
      image: "♓",
      category: "Symbols"
    },
    {
      code: "U+26CE",
      name: "Ophiuchus",
      image: "⛎",
      category: "Symbols"
    },
    {
      code: "U+1F500",
      name: "shuffle tracks button",
      image: "\uD83D\uDD00",
      category: "Symbols"
    },
    {
      code: "U+1F501",
      name: "repeat button",
      image: "\uD83D\uDD01",
      category: "Symbols"
    },
    {
      code: "U+1F502",
      name: "repeat single button",
      image: "\uD83D\uDD02",
      category: "Symbols"
    },
    {
      code: "U+25B6",
      name: "play button",
      image: "▶",
      category: "Symbols"
    },
    {
      code: "U+23E9",
      name: "fast-forward button",
      image: "⏩",
      category: "Symbols"
    },
    {
      code: "U+23ED",
      name: "next track button",
      image: "⏭",
      category: "Symbols"
    },
    {
      code: "U+23EF",
      name: "play or pause button",
      image: "⏯",
      category: "Symbols"
    },
    {
      code: "U+25C0",
      name: "reverse button",
      image: "◀",
      category: "Symbols"
    },
    {
      code: "U+23EA",
      name: "fast reverse button",
      image: "⏪",
      category: "Symbols"
    },
    {
      code: "U+23EE",
      name: "last track button",
      image: "⏮",
      category: "Symbols"
    },
    {
      code: "U+1F53C",
      name: "upwards button",
      image: "\uD83D\uDD3C",
      category: "Symbols"
    },
    {
      code: "U+23EB",
      name: "fast up button",
      image: "⏫",
      category: "Symbols"
    },
    {
      code: "U+1F53D",
      name: "downwards button",
      image: "\uD83D\uDD3D",
      category: "Symbols"
    },
    {
      code: "U+23EC",
      name: "fast down button",
      image: "⏬",
      category: "Symbols"
    },
    {
      code: "U+23F8",
      name: "pause button",
      image: "⏸",
      category: "Symbols"
    },
    {
      code: "U+23F9",
      name: "stop button",
      image: "⏹",
      category: "Symbols"
    },
    {
      code: "U+23FA",
      name: "record button",
      image: "⏺",
      category: "Symbols"
    },
    {
      code: "U+23CF",
      name: "eject button",
      image: "⏏",
      category: "Symbols"
    },
    {
      code: "U+1F3A6",
      name: "cinema",
      image: "\uD83C\uDFA6",
      category: "Symbols"
    },
    {
      code: "U+1F505",
      name: "dim button",
      image: "\uD83D\uDD05",
      category: "Symbols"
    },
    {
      code: "U+1F506",
      name: "bright button",
      image: "\uD83D\uDD06",
      category: "Symbols"
    },
    {
      code: "U+1F4F6",
      name: "antenna bars",
      image: "\uD83D\uDCF6",
      category: "Symbols"
    },
    {
      code: "U+1F4F3",
      name: "vibration mode",
      image: "\uD83D\uDCF3",
      category: "Symbols"
    },
    {
      code: "U+1F4F4",
      name: "mobile phone off",
      image: "\uD83D\uDCF4",
      category: "Symbols"
    },
    {
      code: "U+2640",
      name: "female sign",
      image: "♀",
      category: "Symbols"
    },
    {
      code: "U+2642",
      name: "male sign",
      image: "♂",
      category: "Symbols"
    },
    {
      code: "U+26A7",
      name: "transgender symbol",
      image: "⚧",
      category: "Symbols"
    },
    {
      code: "U+2716",
      name: "multiply",
      image: "✖",
      category: "Symbols"
    },
    {
      code: "U+2795",
      name: "plus",
      image: "➕",
      category: "Symbols"
    },
    {
      code: "U+2796",
      name: "minus",
      image: "➖",
      category: "Symbols"
    },
    {
      code: "U+2797",
      name: "divide",
      image: "➗",
      category: "Symbols"
    },
    {
      code: "U+1F7F0",
      name: "heavy equals sign",
      image: "\uD83D\uDFF0",
      category: "Symbols"
    },
    {
      code: "U+267E",
      name: "infinity",
      image: "♾",
      category: "Symbols"
    },
    {
      code: "U+203C",
      name: "double exclamation mark",
      image: "‼",
      category: "Symbols"
    },
    {
      code: "U+2049",
      name: "exclamation question mark",
      image: "⁉",
      category: "Symbols"
    },
    {
      code: "U+2753",
      name: "red question mark",
      image: "❓",
      category: "Symbols"
    },
    {
      code: "U+2754",
      name: "white question mark",
      image: "❔",
      category: "Symbols"
    },
    {
      code: "U+2755",
      name: "white exclamation mark",
      image: "❕",
      category: "Symbols"
    },
    {
      code: "U+2757",
      name: "red exclamation mark",
      image: "❗",
      category: "Symbols"
    },
    {
      code: "U+3030",
      name: "wavy dash",
      image: "〰",
      category: "Symbols"
    },
    {
      code: "U+1F4B1",
      name: "currency exchange",
      image: "\uD83D\uDCB1",
      category: "Symbols"
    },
    {
      code: "U+1F4B2",
      name: "heavy dollar sign",
      image: "\uD83D\uDCB2",
      category: "Symbols"
    },
    {
      code: "U+2695",
      name: "medical symbol",
      image: "⚕",
      category: "Symbols"
    },
    {
      code: "U+267B",
      name: "recycling symbol",
      image: "♻",
      category: "Symbols"
    },
    {
      code: "U+269C",
      name: "fleur-de-lis",
      image: "⚜",
      category: "Symbols"
    },
    {
      code: "U+1F531",
      name: "trident emblem",
      image: "\uD83D\uDD31",
      category: "Symbols"
    },
    {
      code: "U+1F4DB",
      name: "name badge",
      image: "\uD83D\uDCDB",
      category: "Symbols"
    },
    {
      code: "U+1F530",
      name: "Japanese symbol for beginner",
      image: "\uD83D\uDD30",
      category: "Symbols"
    },
    {
      code: "U+2B55",
      name: "hollow red circle",
      image: "⭕",
      category: "Symbols"
    },
    {
      code: "U+2705",
      name: "check mark button",
      image: "✅",
      category: "Symbols"
    },
    {
      code: "U+2611",
      name: "check box with check",
      image: "☑",
      category: "Symbols"
    },
    {
      code: "U+2714",
      name: "check mark",
      image: "✔",
      category: "Symbols"
    },
    {
      code: "U+274C",
      name: "cross mark",
      image: "❌",
      category: "Symbols"
    },
    {
      code: "U+274E",
      name: "cross mark button",
      image: "❎",
      category: "Symbols"
    },
    {
      code: "U+27B0",
      name: "curly loop",
      image: "➰",
      category: "Symbols"
    },
    {
      code: "U+27BF",
      name: "double curly loop",
      image: "➿",
      category: "Symbols"
    },
    {
      code: "U+303D",
      name: "part alternation mark",
      image: "〽",
      category: "Symbols"
    },
    {
      code: "U+2733",
      name: "eight-spoked asterisk",
      image: "✳",
      category: "Symbols"
    },
    {
      code: "U+2734",
      name: "eight-pointed star",
      image: "✴",
      category: "Symbols"
    },
    {
      code: "U+2747",
      name: "sparkle",
      image: "❇",
      category: "Symbols"
    },
    {
      code: "U+00A9",
      name: "copyright",
      image: "©",
      category: "Symbols"
    },
    {
      code: "U+00AE",
      name: "registered",
      image: "®",
      category: "Symbols"
    },
    {
      code: "U+2122",
      name: "trade mark",
      image: "™",
      category: "Symbols"
    },
    {
      code: "U+0023 U+FE0F U+20E3",
      name: "keycap: #",
      image: "#️⃣",
      category: "Symbols"
    },
    {
      code: "U+002A U+FE0F U+20E3",
      name: "keycap: *",
      image: "*️⃣",
      category: "Symbols"
    },
    {
      code: "U+0030 U+FE0F U+20E3",
      name: "keycap: 0",
      image: "0️⃣",
      category: "Symbols"
    },
    {
      code: "U+0031 U+FE0F U+20E3",
      name: "keycap: 1",
      image: "1️⃣",
      category: "Symbols"
    },
    {
      code: "U+0032 U+FE0F U+20E3",
      name: "keycap: 2",
      image: "2️⃣",
      category: "Symbols"
    },
    {
      code: "U+0033 U+FE0F U+20E3",
      name: "keycap: 3",
      image: "3️⃣",
      category: "Symbols"
    },
    {
      code: "U+0034 U+FE0F U+20E3",
      name: "keycap: 4",
      image: "4️⃣",
      category: "Symbols"
    },
    {
      code: "U+0035 U+FE0F U+20E3",
      name: "keycap: 5",
      image: "5️⃣",
      category: "Symbols"
    },
    {
      code: "U+0036 U+FE0F U+20E3",
      name: "keycap: 6",
      image: "6️⃣",
      category: "Symbols"
    },
    {
      code: "U+0037 U+FE0F U+20E3",
      name: "keycap: 7",
      image: "7️⃣",
      category: "Symbols"
    },
    {
      code: "U+0038 U+FE0F U+20E3",
      name: "keycap: 8",
      image: "8️⃣",
      category: "Symbols"
    },
    {
      code: "U+0039 U+FE0F U+20E3",
      name: "keycap: 9",
      image: "9️⃣",
      category: "Symbols"
    },
    {
      code: "U+1F51F",
      name: "keycap: 10",
      image: "\uD83D\uDD1F",
      category: "Symbols"
    },
    {
      code: "U+1F520",
      name: "input latin uppercase",
      image: "\uD83D\uDD20",
      category: "Symbols"
    },
    {
      code: "U+1F521",
      name: "input latin lowercase",
      image: "\uD83D\uDD21",
      category: "Symbols"
    },
    {
      code: "U+1F522",
      name: "input numbers",
      image: "\uD83D\uDD22",
      category: "Symbols"
    },
    {
      code: "U+1F523",
      name: "input symbols",
      image: "\uD83D\uDD23",
      category: "Symbols"
    },
    {
      code: "U+1F524",
      name: "input latin letters",
      image: "\uD83D\uDD24",
      category: "Symbols"
    },
    {
      code: "U+1F170",
      name: "A button (blood type)",
      image: "\uD83C\uDD70",
      category: "Symbols"
    },
    {
      code: "U+1F18E",
      name: "AB button (blood type)",
      image: "\uD83C\uDD8E",
      category: "Symbols"
    },
    {
      code: "U+1F171",
      name: "B button (blood type)",
      image: "\uD83C\uDD71",
      category: "Symbols"
    },
    {
      code: "U+1F191",
      name: "CL button",
      image: "\uD83C\uDD91",
      category: "Symbols"
    },
    {
      code: "U+1F192",
      name: "COOL button",
      image: "\uD83C\uDD92",
      category: "Symbols"
    },
    {
      code: "U+1F193",
      name: "FREE button",
      image: "\uD83C\uDD93",
      category: "Symbols"
    },
    {
      code: "U+2139",
      name: "information",
      image: "ℹ",
      category: "Symbols"
    },
    {
      code: "U+1F194",
      name: "ID button",
      image: "\uD83C\uDD94",
      category: "Symbols"
    },
    {
      code: "U+24C2",
      name: "circled M",
      image: "Ⓜ",
      category: "Symbols"
    },
    {
      code: "U+1F195",
      name: "NEW button",
      image: "\uD83C\uDD95",
      category: "Symbols"
    },
    {
      code: "U+1F196",
      name: "NG button",
      image: "\uD83C\uDD96",
      category: "Symbols"
    },
    {
      code: "U+1F17E",
      name: "O button (blood type)",
      image: "\uD83C\uDD7E",
      category: "Symbols"
    },
    {
      code: "U+1F197",
      name: "OK button",
      image: "\uD83C\uDD97",
      category: "Symbols"
    },
    {
      code: "U+1F17F",
      name: "P button",
      image: "\uD83C\uDD7F",
      category: "Symbols"
    },
    {
      code: "U+1F198",
      name: "SOS button",
      image: "\uD83C\uDD98",
      category: "Symbols"
    },
    {
      code: "U+1F199",
      name: "UP! button",
      image: "\uD83C\uDD99",
      category: "Symbols"
    },
    {
      code: "U+1F19A",
      name: "VS button",
      image: "\uD83C\uDD9A",
      category: "Symbols"
    },
    {
      code: "U+1F201",
      name: "Japanese “here” button",
      image: "\uD83C\uDE01",
      category: "Symbols"
    },
    {
      code: "U+1F202",
      name: "Japanese “service charge” button",
      image: "\uD83C\uDE02",
      category: "Symbols"
    },
    {
      code: "U+1F237",
      name: "Japanese “monthly amount” button",
      image: "\uD83C\uDE37",
      category: "Symbols"
    },
    {
      code: "U+1F236",
      name: "Japanese “not free of charge” button",
      image: "\uD83C\uDE36",
      category: "Symbols"
    },
    {
      code: "U+1F22F",
      name: "Japanese “reserved” button",
      image: "\uD83C\uDE2F",
      category: "Symbols"
    },
    {
      code: "U+1F250",
      name: "Japanese “bargain” button",
      image: "\uD83C\uDE50",
      category: "Symbols"
    },
    {
      code: "U+1F239",
      name: "Japanese “discount” button",
      image: "\uD83C\uDE39",
      category: "Symbols"
    },
    {
      code: "U+1F21A",
      name: "Japanese “free of charge” button",
      image: "\uD83C\uDE1A",
      category: "Symbols"
    },
    {
      code: "U+1F232",
      name: "Japanese “prohibited” button",
      image: "\uD83C\uDE32",
      category: "Symbols"
    },
    {
      code: "U+1F251",
      name: "Japanese “acceptable” button",
      image: "\uD83C\uDE51",
      category: "Symbols"
    },
    {
      code: "U+1F238",
      name: "Japanese “application” button",
      image: "\uD83C\uDE38",
      category: "Symbols"
    },
    {
      code: "U+1F234",
      name: "Japanese “passing grade” button",
      image: "\uD83C\uDE34",
      category: "Symbols"
    },
    {
      code: "U+1F233",
      name: "Japanese “vacancy” button",
      image: "\uD83C\uDE33",
      category: "Symbols"
    },
    {
      code: "U+3297",
      name: "Japanese “congratulations” button",
      image: "㊗",
      category: "Symbols"
    },
    {
      code: "U+3299",
      name: "Japanese “secret” button",
      image: "㊙",
      category: "Symbols"
    },
    {
      code: "U+1F23A",
      name: "Japanese “open for business” button",
      image: "\uD83C\uDE3A",
      category: "Symbols"
    },
    {
      code: "U+1F235",
      name: "Japanese “no vacancy” button",
      image: "\uD83C\uDE35",
      category: "Symbols"
    },
    {
      code: "U+1F534",
      name: "red circle",
      image: "\uD83D\uDD34",
      category: "Symbols"
    },
    {
      code: "U+1F7E0",
      name: "orange circle",
      image: "\uD83D\uDFE0",
      category: "Symbols"
    },
    {
      code: "U+1F7E1",
      name: "yellow circle",
      image: "\uD83D\uDFE1",
      category: "Symbols"
    },
    {
      code: "U+1F7E2",
      name: "green circle",
      image: "\uD83D\uDFE2",
      category: "Symbols"
    },
    {
      code: "U+1F535",
      name: "blue circle",
      image: "\uD83D\uDD35",
      category: "Symbols"
    },
    {
      code: "U+1F7E3",
      name: "purple circle",
      image: "\uD83D\uDFE3",
      category: "Symbols"
    },
    {
      code: "U+1F7E4",
      name: "brown circle",
      image: "\uD83D\uDFE4",
      category: "Symbols"
    },
    {
      code: "U+26AB",
      name: "black circle",
      image: "⚫",
      category: "Symbols"
    },
    {
      code: "U+26AA",
      name: "white circle",
      image: "⚪",
      category: "Symbols"
    },
    {
      code: "U+1F7E5",
      name: "red square",
      image: "\uD83D\uDFE5",
      category: "Symbols"
    },
    {
      code: "U+1F7E7",
      name: "orange square",
      image: "\uD83D\uDFE7",
      category: "Symbols"
    },
    {
      code: "U+1F7E8",
      name: "yellow square",
      image: "\uD83D\uDFE8",
      category: "Symbols"
    },
    {
      code: "U+1F7E9",
      name: "green square",
      image: "\uD83D\uDFE9",
      category: "Symbols"
    },
    {
      code: "U+1F7E6",
      name: "blue square",
      image: "\uD83D\uDFE6",
      category: "Symbols"
    },
    {
      code: "U+1F7EA",
      name: "purple square",
      image: "\uD83D\uDFEA",
      category: "Symbols"
    },
    {
      code: "U+1F7EB",
      name: "brown square",
      image: "\uD83D\uDFEB",
      category: "Symbols"
    },
    {
      code: "U+2B1B",
      name: "black large square",
      image: "⬛",
      category: "Symbols"
    },
    {
      code: "U+2B1C",
      name: "white large square",
      image: "⬜",
      category: "Symbols"
    },
    {
      code: "U+25FC",
      name: "black medium square",
      image: "◼",
      category: "Symbols"
    },
    {
      code: "U+25FB",
      name: "white medium square",
      image: "◻",
      category: "Symbols"
    },
    {
      code: "U+25FE",
      name: "black medium-small square",
      image: "◾",
      category: "Symbols"
    },
    {
      code: "U+25FD",
      name: "white medium-small square",
      image: "◽",
      category: "Symbols"
    },
    {
      code: "U+25AA",
      name: "black small square",
      image: "▪",
      category: "Symbols"
    },
    {
      code: "U+25AB",
      name: "white small square",
      image: "▫",
      category: "Symbols"
    },
    {
      code: "U+1F536",
      name: "large orange diamond",
      image: "\uD83D\uDD36",
      category: "Symbols"
    },
    {
      code: "U+1F537",
      name: "large blue diamond",
      image: "\uD83D\uDD37",
      category: "Symbols"
    },
    {
      code: "U+1F538",
      name: "small orange diamond",
      image: "\uD83D\uDD38",
      category: "Symbols"
    },
    {
      code: "U+1F539",
      name: "small blue diamond",
      image: "\uD83D\uDD39",
      category: "Symbols"
    },
    {
      code: "U+1F53A",
      name: "red triangle pointed up",
      image: "\uD83D\uDD3A",
      category: "Symbols"
    },
    {
      code: "U+1F53B",
      name: "red triangle pointed down",
      image: "\uD83D\uDD3B",
      category: "Symbols"
    },
    {
      code: "U+1F4A0",
      name: "diamond with a dot",
      image: "\uD83D\uDCA0",
      category: "Symbols"
    },
    {
      code: "U+1F518",
      name: "radio button",
      image: "\uD83D\uDD18",
      category: "Symbols"
    },
    {
      code: "U+1F533",
      name: "white square button",
      image: "\uD83D\uDD33",
      category: "Symbols"
    },
    {
      code: "U+1F532",
      name: "black square button",
      image: "\uD83D\uDD32",
      category: "Symbols"
    },
    {
      code: "U+1F3C1",
      name: "chequered flag",
      image: "\uD83C\uDFC1",
      category: "Flags"
    },
    {
      code: "U+1F6A9",
      name: "triangular flag",
      image: "\uD83D\uDEA9",
      category: "Flags"
    },
    {
      code: "U+1F38C",
      name: "crossed flags",
      image: "\uD83C\uDF8C",
      category: "Flags"
    },
    {
      code: "U+1F3F4",
      name: "black flag",
      image: "\uD83C\uDFF4",
      category: "Flags"
    },
    {
      code: "U+1F3F3",
      name: "white flag",
      image: "\uD83C\uDFF3",
      category: "Flags"
    },
    {
      code: "U+1F3F3 U+FE0F U+200D U+1F308",
      name: "rainbow flag",
      image: "\uD83C\uDFF3️‍\uD83C\uDF08",
      category: "Flags"
    },
    {
      code: "U+1F3F3 U+FE0F U+200D U+26A7 U+FE0F",
      name: "transgender flag",
      image: "\uD83C\uDFF3️‍⚧️",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+200D U+2620 U+FE0F",
      name: "pirate flag",
      image: "\uD83C\uDFF4‍☠️",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1E8",
      name: "flag: Ascension Island",
      image: "\uD83C\uDDE6\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1E9",
      name: "flag: Andorra",
      image: "\uD83C\uDDE6\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EA",
      name: "flag: United Arab Emirates",
      image: "\uD83C\uDDE6\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EB",
      name: "flag: Afghanistan",
      image: "\uD83C\uDDE6\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EC",
      name: "flag: Antigua & Barbuda",
      image: "\uD83C\uDDE6\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EE",
      name: "flag: Anguilla",
      image: "\uD83C\uDDE6\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F1",
      name: "flag: Albania",
      image: "\uD83C\uDDE6\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F2",
      name: "flag: Armenia",
      image: "\uD83C\uDDE6\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F4",
      name: "flag: Angola",
      image: "\uD83C\uDDE6\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F6",
      name: "flag: Antarctica",
      image: "\uD83C\uDDE6\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F7",
      name: "flag: Argentina",
      image: "\uD83C\uDDE6\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F8",
      name: "flag: American Samoa",
      image: "\uD83C\uDDE6\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F9",
      name: "flag: Austria",
      image: "\uD83C\uDDE6\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FA",
      name: "flag: Australia",
      image: "\uD83C\uDDE6\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FC",
      name: "flag: Aruba",
      image: "\uD83C\uDDE6\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FD",
      name: "flag: Åland Islands",
      image: "\uD83C\uDDE6\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FF",
      name: "flag: Azerbaijan",
      image: "\uD83C\uDDE6\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1E6",
      name: "flag: Bosnia & Herzegovina",
      image: "\uD83C\uDDE7\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1E7",
      name: "flag: Barbados",
      image: "\uD83C\uDDE7\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1E9",
      name: "flag: Bangladesh",
      image: "\uD83C\uDDE7\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EA",
      name: "flag: Belgium",
      image: "\uD83C\uDDE7\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EB",
      name: "flag: Burkina Faso",
      image: "\uD83C\uDDE7\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EC",
      name: "flag: Bulgaria",
      image: "\uD83C\uDDE7\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1ED",
      name: "flag: Bahrain",
      image: "\uD83C\uDDE7\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EE",
      name: "flag: Burundi",
      image: "\uD83C\uDDE7\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EF",
      name: "flag: Benin",
      image: "\uD83C\uDDE7\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F1",
      name: "flag: St. Barthélemy",
      image: "\uD83C\uDDE7\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F2",
      name: "flag: Bermuda",
      image: "\uD83C\uDDE7\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F3",
      name: "flag: Brunei",
      image: "\uD83C\uDDE7\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F4",
      name: "flag: Bolivia",
      image: "\uD83C\uDDE7\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F6",
      name: "flag: Caribbean Netherlands",
      image: "\uD83C\uDDE7\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F7",
      name: "flag: Brazil",
      image: "\uD83C\uDDE7\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F8",
      name: "flag: Bahamas",
      image: "\uD83C\uDDE7\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F9",
      name: "flag: Bhutan",
      image: "\uD83C\uDDE7\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FB",
      name: "flag: Bouvet Island",
      image: "\uD83C\uDDE7\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FC",
      name: "flag: Botswana",
      image: "\uD83C\uDDE7\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FE",
      name: "flag: Belarus",
      image: "\uD83C\uDDE7\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FF",
      name: "flag: Belize",
      image: "\uD83C\uDDE7\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1E6",
      name: "flag: Canada",
      image: "\uD83C\uDDE8\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1E8",
      name: "flag: Cocos (Keeling) Islands",
      image: "\uD83C\uDDE8\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1E9",
      name: "flag: Congo - Kinshasa",
      image: "\uD83C\uDDE8\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1EB",
      name: "flag: Central African Republic",
      image: "\uD83C\uDDE8\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1EC",
      name: "flag: Congo - Brazzaville",
      image: "\uD83C\uDDE8\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1ED",
      name: "flag: Switzerland",
      image: "\uD83C\uDDE8\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1EE",
      name: "flag: Côte d’Ivoire",
      image: "\uD83C\uDDE8\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F0",
      name: "flag: Cook Islands",
      image: "\uD83C\uDDE8\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F1",
      name: "flag: Chile",
      image: "\uD83C\uDDE8\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F2",
      name: "flag: Cameroon",
      image: "\uD83C\uDDE8\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F3",
      name: "flag: China",
      image: "\uD83C\uDDE8\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F4",
      name: "flag: Colombia",
      image: "\uD83C\uDDE8\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F5",
      name: "flag: Clipperton Island",
      image: "\uD83C\uDDE8\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F7",
      name: "flag: Costa Rica",
      image: "\uD83C\uDDE8\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FA",
      name: "flag: Cuba",
      image: "\uD83C\uDDE8\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FB",
      name: "flag: Cape Verde",
      image: "\uD83C\uDDE8\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FC",
      name: "flag: Curaçao",
      image: "\uD83C\uDDE8\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FD",
      name: "flag: Christmas Island",
      image: "\uD83C\uDDE8\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FE",
      name: "flag: Cyprus",
      image: "\uD83C\uDDE8\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FF",
      name: "flag: Czechia",
      image: "\uD83C\uDDE8\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1EA",
      name: "flag: Germany",
      image: "\uD83C\uDDE9\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1EC",
      name: "flag: Diego Garcia",
      image: "\uD83C\uDDE9\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1EF",
      name: "flag: Djibouti",
      image: "\uD83C\uDDE9\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1F0",
      name: "flag: Denmark",
      image: "\uD83C\uDDE9\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1F2",
      name: "flag: Dominica",
      image: "\uD83C\uDDE9\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1F4",
      name: "flag: Dominican Republic",
      image: "\uD83C\uDDE9\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1FF",
      name: "flag: Algeria",
      image: "\uD83C\uDDE9\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1E6",
      name: "flag: Ceuta & Melilla",
      image: "\uD83C\uDDEA\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1E8",
      name: "flag: Ecuador",
      image: "\uD83C\uDDEA\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1EA",
      name: "flag: Estonia",
      image: "\uD83C\uDDEA\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1EC",
      name: "flag: Egypt",
      image: "\uD83C\uDDEA\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1ED",
      name: "flag: Western Sahara",
      image: "\uD83C\uDDEA\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1F7",
      name: "flag: Eritrea",
      image: "\uD83C\uDDEA\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1F8",
      name: "flag: Spain",
      image: "\uD83C\uDDEA\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1F9",
      name: "flag: Ethiopia",
      image: "\uD83C\uDDEA\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1FA",
      name: "flag: European Union",
      image: "\uD83C\uDDEA\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1EE",
      name: "flag: Finland",
      image: "\uD83C\uDDEB\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1EF",
      name: "flag: Fiji",
      image: "\uD83C\uDDEB\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F0",
      name: "flag: Falkland Islands",
      image: "\uD83C\uDDEB\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F2",
      name: "flag: Micronesia",
      image: "\uD83C\uDDEB\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F4",
      name: "flag: Faroe Islands",
      image: "\uD83C\uDDEB\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F7",
      name: "flag: France",
      image: "\uD83C\uDDEB\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1E6",
      name: "flag: Gabon",
      image: "\uD83C\uDDEC\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1E7",
      name: "flag: United Kingdom",
      image: "\uD83C\uDDEC\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1E9",
      name: "flag: Grenada",
      image: "\uD83C\uDDEC\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EA",
      name: "flag: Georgia",
      image: "\uD83C\uDDEC\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EB",
      name: "flag: French Guiana",
      image: "\uD83C\uDDEC\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EC",
      name: "flag: Guernsey",
      image: "\uD83C\uDDEC\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1ED",
      name: "flag: Ghana",
      image: "\uD83C\uDDEC\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EE",
      name: "flag: Gibraltar",
      image: "\uD83C\uDDEC\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F1",
      name: "flag: Greenland",
      image: "\uD83C\uDDEC\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F2",
      name: "flag: Gambia",
      image: "\uD83C\uDDEC\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F3",
      name: "flag: Guinea",
      image: "\uD83C\uDDEC\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F5",
      name: "flag: Guadeloupe",
      image: "\uD83C\uDDEC\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F6",
      name: "flag: Equatorial Guinea",
      image: "\uD83C\uDDEC\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F7",
      name: "flag: Greece",
      image: "\uD83C\uDDEC\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F8",
      name: "flag: South Georgia & South Sandwich Islands",
      image: "\uD83C\uDDEC\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F9",
      name: "flag: Guatemala",
      image: "\uD83C\uDDEC\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1FA",
      name: "flag: Guam",
      image: "\uD83C\uDDEC\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1FC",
      name: "flag: Guinea-Bissau",
      image: "\uD83C\uDDEC\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1FE",
      name: "flag: Guyana",
      image: "\uD83C\uDDEC\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F0",
      name: "flag: Hong Kong SAR China",
      image: "\uD83C\uDDED\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F2",
      name: "flag: Heard & McDonald Islands",
      image: "\uD83C\uDDED\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F3",
      name: "flag: Honduras",
      image: "\uD83C\uDDED\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F7",
      name: "flag: Croatia",
      image: "\uD83C\uDDED\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F9",
      name: "flag: Haiti",
      image: "\uD83C\uDDED\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1FA",
      name: "flag: Hungary",
      image: "\uD83C\uDDED\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1E8",
      name: "flag: Canary Islands",
      image: "\uD83C\uDDEE\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1E9",
      name: "flag: Indonesia",
      image: "\uD83C\uDDEE\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1EA",
      name: "flag: Ireland",
      image: "\uD83C\uDDEE\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F1",
      name: "flag: Israel",
      image: "\uD83C\uDDEE\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F2",
      name: "flag: Isle of Man",
      image: "\uD83C\uDDEE\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F3",
      name: "flag: India",
      image: "\uD83C\uDDEE\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F4",
      name: "flag: British Indian Ocean Territory",
      image: "\uD83C\uDDEE\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F6",
      name: "flag: Iraq",
      image: "\uD83C\uDDEE\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F7",
      name: "flag: Iran",
      image: "\uD83C\uDDEE\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F8",
      name: "flag: Iceland",
      image: "\uD83C\uDDEE\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F9",
      name: "flag: Italy",
      image: "\uD83C\uDDEE\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1EA",
      name: "flag: Jersey",
      image: "\uD83C\uDDEF\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1F2",
      name: "flag: Jamaica",
      image: "\uD83C\uDDEF\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1F4",
      name: "flag: Jordan",
      image: "\uD83C\uDDEF\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1F5",
      name: "flag: Japan",
      image: "\uD83C\uDDEF\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1EA",
      name: "flag: Kenya",
      image: "\uD83C\uDDF0\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1EC",
      name: "flag: Kyrgyzstan",
      image: "\uD83C\uDDF0\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1ED",
      name: "flag: Cambodia",
      image: "\uD83C\uDDF0\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1EE",
      name: "flag: Kiribati",
      image: "\uD83C\uDDF0\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F2",
      name: "flag: Comoros",
      image: "\uD83C\uDDF0\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F3",
      name: "flag: St. Kitts & Nevis",
      image: "\uD83C\uDDF0\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F5",
      name: "flag: North Korea",
      image: "\uD83C\uDDF0\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F7",
      name: "flag: South Korea",
      image: "\uD83C\uDDF0\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1FC",
      name: "flag: Kuwait",
      image: "\uD83C\uDDF0\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1FE",
      name: "flag: Cayman Islands",
      image: "\uD83C\uDDF0\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1FF",
      name: "flag: Kazakhstan",
      image: "\uD83C\uDDF0\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1E6",
      name: "flag: Laos",
      image: "\uD83C\uDDF1\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1E7",
      name: "flag: Lebanon",
      image: "\uD83C\uDDF1\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1E8",
      name: "flag: St. Lucia",
      image: "\uD83C\uDDF1\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1EE",
      name: "flag: Liechtenstein",
      image: "\uD83C\uDDF1\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F0",
      name: "flag: Sri Lanka",
      image: "\uD83C\uDDF1\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F7",
      name: "flag: Liberia",
      image: "\uD83C\uDDF1\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F8",
      name: "flag: Lesotho",
      image: "\uD83C\uDDF1\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F9",
      name: "flag: Lithuania",
      image: "\uD83C\uDDF1\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1FA",
      name: "flag: Luxembourg",
      image: "\uD83C\uDDF1\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1FB",
      name: "flag: Latvia",
      image: "\uD83C\uDDF1\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1FE",
      name: "flag: Libya",
      image: "\uD83C\uDDF1\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1E6",
      name: "flag: Morocco",
      image: "\uD83C\uDDF2\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1E8",
      name: "flag: Monaco",
      image: "\uD83C\uDDF2\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1E9",
      name: "flag: Moldova",
      image: "\uD83C\uDDF2\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1EA",
      name: "flag: Montenegro",
      image: "\uD83C\uDDF2\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1EB",
      name: "flag: St. Martin",
      image: "\uD83C\uDDF2\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1EC",
      name: "flag: Madagascar",
      image: "\uD83C\uDDF2\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1ED",
      name: "flag: Marshall Islands",
      image: "\uD83C\uDDF2\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F0",
      name: "flag: North Macedonia",
      image: "\uD83C\uDDF2\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F1",
      name: "flag: Mali",
      image: "\uD83C\uDDF2\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F2",
      name: "flag: Myanmar (Burma)",
      image: "\uD83C\uDDF2\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F3",
      name: "flag: Mongolia",
      image: "\uD83C\uDDF2\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F4",
      name: "flag: Macao SAR China",
      image: "\uD83C\uDDF2\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F5",
      name: "flag: Northern Mariana Islands",
      image: "\uD83C\uDDF2\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F6",
      name: "flag: Martinique",
      image: "\uD83C\uDDF2\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F7",
      name: "flag: Mauritania",
      image: "\uD83C\uDDF2\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F8",
      name: "flag: Montserrat",
      image: "\uD83C\uDDF2\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F9",
      name: "flag: Malta",
      image: "\uD83C\uDDF2\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FA",
      name: "flag: Mauritius",
      image: "\uD83C\uDDF2\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FB",
      name: "flag: Maldives",
      image: "\uD83C\uDDF2\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FC",
      name: "flag: Malawi",
      image: "\uD83C\uDDF2\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FD",
      name: "flag: Mexico",
      image: "\uD83C\uDDF2\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FE",
      name: "flag: Malaysia",
      image: "\uD83C\uDDF2\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FF",
      name: "flag: Mozambique",
      image: "\uD83C\uDDF2\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1E6",
      name: "flag: Namibia",
      image: "\uD83C\uDDF3\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1E8",
      name: "flag: New Caledonia",
      image: "\uD83C\uDDF3\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EA",
      name: "flag: Niger",
      image: "\uD83C\uDDF3\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EB",
      name: "flag: Norfolk Island",
      image: "\uD83C\uDDF3\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EC",
      name: "flag: Nigeria",
      image: "\uD83C\uDDF3\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EE",
      name: "flag: Nicaragua",
      image: "\uD83C\uDDF3\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F1",
      name: "flag: Netherlands",
      image: "\uD83C\uDDF3\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F4",
      name: "flag: Norway",
      image: "\uD83C\uDDF3\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F5",
      name: "flag: Nepal",
      image: "\uD83C\uDDF3\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F7",
      name: "flag: Nauru",
      image: "\uD83C\uDDF3\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1FA",
      name: "flag: Niue",
      image: "\uD83C\uDDF3\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1FF",
      name: "flag: New Zealand",
      image: "\uD83C\uDDF3\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F4 U+1F1F2",
      name: "flag: Oman",
      image: "\uD83C\uDDF4\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1E6",
      name: "flag: Panama",
      image: "\uD83C\uDDF5\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1EA",
      name: "flag: Peru",
      image: "\uD83C\uDDF5\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1EB",
      name: "flag: French Polynesia",
      image: "\uD83C\uDDF5\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1EC",
      name: "flag: Papua New Guinea",
      image: "\uD83C\uDDF5\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1ED",
      name: "flag: Philippines",
      image: "\uD83C\uDDF5\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F0",
      name: "flag: Pakistan",
      image: "\uD83C\uDDF5\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F1",
      name: "flag: Poland",
      image: "\uD83C\uDDF5\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F2",
      name: "flag: St. Pierre & Miquelon",
      image: "\uD83C\uDDF5\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F3",
      name: "flag: Pitcairn Islands",
      image: "\uD83C\uDDF5\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F7",
      name: "flag: Puerto Rico",
      image: "\uD83C\uDDF5\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F8",
      name: "flag: Palestinian Territories",
      image: "\uD83C\uDDF5\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F9",
      name: "flag: Portugal",
      image: "\uD83C\uDDF5\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1FC",
      name: "flag: Palau",
      image: "\uD83C\uDDF5\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1FE",
      name: "flag: Paraguay",
      image: "\uD83C\uDDF5\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F6 U+1F1E6",
      name: "flag: Qatar",
      image: "\uD83C\uDDF6\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1EA",
      name: "flag: Réunion",
      image: "\uD83C\uDDF7\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1F4",
      name: "flag: Romania",
      image: "\uD83C\uDDF7\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1F8",
      name: "flag: Serbia",
      image: "\uD83C\uDDF7\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1FA",
      name: "flag: Russia",
      image: "\uD83C\uDDF7\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1FC",
      name: "flag: Rwanda",
      image: "\uD83C\uDDF7\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E6",
      name: "flag: Saudi Arabia",
      image: "\uD83C\uDDF8\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E7",
      name: "flag: Solomon Islands",
      image: "\uD83C\uDDF8\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E8",
      name: "flag: Seychelles",
      image: "\uD83C\uDDF8\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E9",
      name: "flag: Sudan",
      image: "\uD83C\uDDF8\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EA",
      name: "flag: Sweden",
      image: "\uD83C\uDDF8\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EC",
      name: "flag: Singapore",
      image: "\uD83C\uDDF8\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1ED",
      name: "flag: St. Helena",
      image: "\uD83C\uDDF8\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EE",
      name: "flag: Slovenia",
      image: "\uD83C\uDDF8\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EF",
      name: "flag: Svalbard & Jan Mayen",
      image: "\uD83C\uDDF8\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F0",
      name: "flag: Slovakia",
      image: "\uD83C\uDDF8\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F1",
      name: "flag: Sierra Leone",
      image: "\uD83C\uDDF8\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F2",
      name: "flag: San Marino",
      image: "\uD83C\uDDF8\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F3",
      name: "flag: Senegal",
      image: "\uD83C\uDDF8\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F4",
      name: "flag: Somalia",
      image: "\uD83C\uDDF8\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F7",
      name: "flag: Suriname",
      image: "\uD83C\uDDF8\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F8",
      name: "flag: South Sudan",
      image: "\uD83C\uDDF8\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F9",
      name: "flag: São Tomé & Príncipe",
      image: "\uD83C\uDDF8\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FB",
      name: "flag: El Salvador",
      image: "\uD83C\uDDF8\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FD",
      name: "flag: Sint Maarten",
      image: "\uD83C\uDDF8\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FE",
      name: "flag: Syria",
      image: "\uD83C\uDDF8\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FF",
      name: "flag: Eswatini",
      image: "\uD83C\uDDF8\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1E6",
      name: "flag: Tristan da Cunha",
      image: "\uD83C\uDDF9\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1E8",
      name: "flag: Turks & Caicos Islands",
      image: "\uD83C\uDDF9\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1E9",
      name: "flag: Chad",
      image: "\uD83C\uDDF9\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1EB",
      name: "flag: French Southern Territories",
      image: "\uD83C\uDDF9\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1EC",
      name: "flag: Togo",
      image: "\uD83C\uDDF9\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1ED",
      name: "flag: Thailand",
      image: "\uD83C\uDDF9\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1EF",
      name: "flag: Tajikistan",
      image: "\uD83C\uDDF9\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F0",
      name: "flag: Tokelau",
      image: "\uD83C\uDDF9\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F1",
      name: "flag: Timor-Leste",
      image: "\uD83C\uDDF9\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F2",
      name: "flag: Turkmenistan",
      image: "\uD83C\uDDF9\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F3",
      name: "flag: Tunisia",
      image: "\uD83C\uDDF9\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F4",
      name: "flag: Tonga",
      image: "\uD83C\uDDF9\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F7",
      name: "flag: Turkey",
      image: "\uD83C\uDDF9\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F9",
      name: "flag: Trinidad & Tobago",
      image: "\uD83C\uDDF9\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1FB",
      name: "flag: Tuvalu",
      image: "\uD83C\uDDF9\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1FC",
      name: "flag: Taiwan",
      image: "\uD83C\uDDF9\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1FF",
      name: "flag: Tanzania",
      image: "\uD83C\uDDF9\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1E6",
      name: "flag: Ukraine",
      image: "\uD83C\uDDFA\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1EC",
      name: "flag: Uganda",
      image: "\uD83C\uDDFA\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1F2",
      name: "flag: U.S. Outlying Islands",
      image: "\uD83C\uDDFA\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1F3",
      name: "flag: United Nations",
      image: "\uD83C\uDDFA\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1F8",
      name: "flag: United States",
      image: "\uD83C\uDDFA\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1FE",
      name: "flag: Uruguay",
      image: "\uD83C\uDDFA\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1FF",
      name: "flag: Uzbekistan",
      image: "\uD83C\uDDFA\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1E6",
      name: "flag: Vatican City",
      image: "\uD83C\uDDFB\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1E8",
      name: "flag: St. Vincent & Grenadines",
      image: "\uD83C\uDDFB\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1EA",
      name: "flag: Venezuela",
      image: "\uD83C\uDDFB\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1EC",
      name: "flag: British Virgin Islands",
      image: "\uD83C\uDDFB\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1EE",
      name: "flag: U.S. Virgin Islands",
      image: "\uD83C\uDDFB\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1F3",
      name: "flag: Vietnam",
      image: "\uD83C\uDDFB\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1FA",
      name: "flag: Vanuatu",
      image: "\uD83C\uDDFB\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1FC U+1F1EB",
      name: "flag: Wallis & Futuna",
      image: "\uD83C\uDDFC\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1FC U+1F1F8",
      name: "flag: Samoa",
      image: "\uD83C\uDDFC\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1FD U+1F1F0",
      name: "flag: Kosovo",
      image: "\uD83C\uDDFD\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1FE U+1F1EA",
      name: "flag: Yemen",
      image: "\uD83C\uDDFE\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1FE U+1F1F9",
      name: "flag: Mayotte",
      image: "\uD83C\uDDFE\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1FF U+1F1E6",
      name: "flag: South Africa",
      image: "\uD83C\uDDFF\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1FF U+1F1F2",
      name: "flag: Zambia",
      image: "\uD83C\uDDFF\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1FF U+1F1FC",
      name: "flag: Zimbabwe",
      image: "\uD83C\uDDFF\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+E0067 U+E0062 U+E0065 U+E006E U+E0067 U+E007F",
      name: "flag: England",
      image: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+E0067 U+E0062 U+E0073 U+E0063 U+E0074 U+E007F",
      name: "flag: Scotland",
      image: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+E0067 U+E0062 U+E0077 U+E006C U+E0073 U+E007F",
      name: "flag: Wales",
      image: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73\uDB40\uDC7F",
      category: "Flags"
    },
    {
      code: "U+1F3C1",
      name: "chequered flag",
      image: "\uD83C\uDFC1",
      category: "Flags"
    },
    {
      code: "U+1F6A9",
      name: "triangular flag",
      image: "\uD83D\uDEA9",
      category: "Flags"
    },
    {
      code: "U+1F38C",
      name: "crossed flags",
      image: "\uD83C\uDF8C",
      category: "Flags"
    },
    {
      code: "U+1F3F4",
      name: "black flag",
      image: "\uD83C\uDFF4",
      category: "Flags"
    },
    {
      code: "U+1F3F3",
      name: "white flag",
      image: "\uD83C\uDFF3",
      category: "Flags"
    },
    {
      code: "U+1F3F3 U+FE0F U+200D U+1F308",
      name: "rainbow flag",
      image: "\uD83C\uDFF3️‍\uD83C\uDF08",
      category: "Flags"
    },
    {
      code: "U+1F3F3 U+FE0F U+200D U+26A7 U+FE0F",
      name: "transgender flag",
      image: "\uD83C\uDFF3️‍⚧️",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+200D U+2620 U+FE0F",
      name: "pirate flag",
      image: "\uD83C\uDFF4‍☠️",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1E8",
      name: "flag: Ascension Island",
      image: "\uD83C\uDDE6\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1E9",
      name: "flag: Andorra",
      image: "\uD83C\uDDE6\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EA",
      name: "flag: United Arab Emirates",
      image: "\uD83C\uDDE6\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EB",
      name: "flag: Afghanistan",
      image: "\uD83C\uDDE6\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EC",
      name: "flag: Antigua & Barbuda",
      image: "\uD83C\uDDE6\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EE",
      name: "flag: Anguilla",
      image: "\uD83C\uDDE6\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F1",
      name: "flag: Albania",
      image: "\uD83C\uDDE6\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F2",
      name: "flag: Armenia",
      image: "\uD83C\uDDE6\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F4",
      name: "flag: Angola",
      image: "\uD83C\uDDE6\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F6",
      name: "flag: Antarctica",
      image: "\uD83C\uDDE6\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F7",
      name: "flag: Argentina",
      image: "\uD83C\uDDE6\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F8",
      name: "flag: American Samoa",
      image: "\uD83C\uDDE6\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F9",
      name: "flag: Austria",
      image: "\uD83C\uDDE6\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FA",
      name: "flag: Australia",
      image: "\uD83C\uDDE6\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FC",
      name: "flag: Aruba",
      image: "\uD83C\uDDE6\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FD",
      name: "flag: Åland Islands",
      image: "\uD83C\uDDE6\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FF",
      name: "flag: Azerbaijan",
      image: "\uD83C\uDDE6\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1E6",
      name: "flag: Bosnia & Herzegovina",
      image: "\uD83C\uDDE7\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1E7",
      name: "flag: Barbados",
      image: "\uD83C\uDDE7\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1E9",
      name: "flag: Bangladesh",
      image: "\uD83C\uDDE7\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EA",
      name: "flag: Belgium",
      image: "\uD83C\uDDE7\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EB",
      name: "flag: Burkina Faso",
      image: "\uD83C\uDDE7\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EC",
      name: "flag: Bulgaria",
      image: "\uD83C\uDDE7\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1ED",
      name: "flag: Bahrain",
      image: "\uD83C\uDDE7\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EE",
      name: "flag: Burundi",
      image: "\uD83C\uDDE7\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EF",
      name: "flag: Benin",
      image: "\uD83C\uDDE7\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F1",
      name: "flag: St. Barthélemy",
      image: "\uD83C\uDDE7\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F2",
      name: "flag: Bermuda",
      image: "\uD83C\uDDE7\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F3",
      name: "flag: Brunei",
      image: "\uD83C\uDDE7\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F4",
      name: "flag: Bolivia",
      image: "\uD83C\uDDE7\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F6",
      name: "flag: Caribbean Netherlands",
      image: "\uD83C\uDDE7\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F7",
      name: "flag: Brazil",
      image: "\uD83C\uDDE7\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F8",
      name: "flag: Bahamas",
      image: "\uD83C\uDDE7\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F9",
      name: "flag: Bhutan",
      image: "\uD83C\uDDE7\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FB",
      name: "flag: Bouvet Island",
      image: "\uD83C\uDDE7\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FC",
      name: "flag: Botswana",
      image: "\uD83C\uDDE7\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FE",
      name: "flag: Belarus",
      image: "\uD83C\uDDE7\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FF",
      name: "flag: Belize",
      image: "\uD83C\uDDE7\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1E6",
      name: "flag: Canada",
      image: "\uD83C\uDDE8\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1E8",
      name: "flag: Cocos (Keeling) Islands",
      image: "\uD83C\uDDE8\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1E9",
      name: "flag: Congo - Kinshasa",
      image: "\uD83C\uDDE8\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1EB",
      name: "flag: Central African Republic",
      image: "\uD83C\uDDE8\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1EC",
      name: "flag: Congo - Brazzaville",
      image: "\uD83C\uDDE8\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1ED",
      name: "flag: Switzerland",
      image: "\uD83C\uDDE8\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1EE",
      name: "flag: Côte d’Ivoire",
      image: "\uD83C\uDDE8\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F0",
      name: "flag: Cook Islands",
      image: "\uD83C\uDDE8\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F1",
      name: "flag: Chile",
      image: "\uD83C\uDDE8\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F2",
      name: "flag: Cameroon",
      image: "\uD83C\uDDE8\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F3",
      name: "flag: China",
      image: "\uD83C\uDDE8\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F4",
      name: "flag: Colombia",
      image: "\uD83C\uDDE8\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F5",
      name: "flag: Clipperton Island",
      image: "\uD83C\uDDE8\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F7",
      name: "flag: Costa Rica",
      image: "\uD83C\uDDE8\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FA",
      name: "flag: Cuba",
      image: "\uD83C\uDDE8\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FB",
      name: "flag: Cape Verde",
      image: "\uD83C\uDDE8\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FC",
      name: "flag: Curaçao",
      image: "\uD83C\uDDE8\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FD",
      name: "flag: Christmas Island",
      image: "\uD83C\uDDE8\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FE",
      name: "flag: Cyprus",
      image: "\uD83C\uDDE8\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FF",
      name: "flag: Czechia",
      image: "\uD83C\uDDE8\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1EA",
      name: "flag: Germany",
      image: "\uD83C\uDDE9\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1EC",
      name: "flag: Diego Garcia",
      image: "\uD83C\uDDE9\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1EF",
      name: "flag: Djibouti",
      image: "\uD83C\uDDE9\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1F0",
      name: "flag: Denmark",
      image: "\uD83C\uDDE9\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1F2",
      name: "flag: Dominica",
      image: "\uD83C\uDDE9\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1F4",
      name: "flag: Dominican Republic",
      image: "\uD83C\uDDE9\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1FF",
      name: "flag: Algeria",
      image: "\uD83C\uDDE9\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1E6",
      name: "flag: Ceuta & Melilla",
      image: "\uD83C\uDDEA\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1E8",
      name: "flag: Ecuador",
      image: "\uD83C\uDDEA\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1EA",
      name: "flag: Estonia",
      image: "\uD83C\uDDEA\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1EC",
      name: "flag: Egypt",
      image: "\uD83C\uDDEA\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1ED",
      name: "flag: Western Sahara",
      image: "\uD83C\uDDEA\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1F7",
      name: "flag: Eritrea",
      image: "\uD83C\uDDEA\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1F8",
      name: "flag: Spain",
      image: "\uD83C\uDDEA\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1F9",
      name: "flag: Ethiopia",
      image: "\uD83C\uDDEA\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1FA",
      name: "flag: European Union",
      image: "\uD83C\uDDEA\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1EE",
      name: "flag: Finland",
      image: "\uD83C\uDDEB\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1EF",
      name: "flag: Fiji",
      image: "\uD83C\uDDEB\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F0",
      name: "flag: Falkland Islands",
      image: "\uD83C\uDDEB\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F2",
      name: "flag: Micronesia",
      image: "\uD83C\uDDEB\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F4",
      name: "flag: Faroe Islands",
      image: "\uD83C\uDDEB\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F7",
      name: "flag: France",
      image: "\uD83C\uDDEB\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1E6",
      name: "flag: Gabon",
      image: "\uD83C\uDDEC\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1E7",
      name: "flag: United Kingdom",
      image: "\uD83C\uDDEC\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1E9",
      name: "flag: Grenada",
      image: "\uD83C\uDDEC\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EA",
      name: "flag: Georgia",
      image: "\uD83C\uDDEC\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EB",
      name: "flag: French Guiana",
      image: "\uD83C\uDDEC\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EC",
      name: "flag: Guernsey",
      image: "\uD83C\uDDEC\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1ED",
      name: "flag: Ghana",
      image: "\uD83C\uDDEC\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EE",
      name: "flag: Gibraltar",
      image: "\uD83C\uDDEC\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F1",
      name: "flag: Greenland",
      image: "\uD83C\uDDEC\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F2",
      name: "flag: Gambia",
      image: "\uD83C\uDDEC\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F3",
      name: "flag: Guinea",
      image: "\uD83C\uDDEC\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F5",
      name: "flag: Guadeloupe",
      image: "\uD83C\uDDEC\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F6",
      name: "flag: Equatorial Guinea",
      image: "\uD83C\uDDEC\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F7",
      name: "flag: Greece",
      image: "\uD83C\uDDEC\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F8",
      name: "flag: South Georgia & South Sandwich Islands",
      image: "\uD83C\uDDEC\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F9",
      name: "flag: Guatemala",
      image: "\uD83C\uDDEC\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1FA",
      name: "flag: Guam",
      image: "\uD83C\uDDEC\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1FC",
      name: "flag: Guinea-Bissau",
      image: "\uD83C\uDDEC\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1FE",
      name: "flag: Guyana",
      image: "\uD83C\uDDEC\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F0",
      name: "flag: Hong Kong SAR China",
      image: "\uD83C\uDDED\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F2",
      name: "flag: Heard & McDonald Islands",
      image: "\uD83C\uDDED\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F3",
      name: "flag: Honduras",
      image: "\uD83C\uDDED\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F7",
      name: "flag: Croatia",
      image: "\uD83C\uDDED\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F9",
      name: "flag: Haiti",
      image: "\uD83C\uDDED\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1FA",
      name: "flag: Hungary",
      image: "\uD83C\uDDED\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1E8",
      name: "flag: Canary Islands",
      image: "\uD83C\uDDEE\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1E9",
      name: "flag: Indonesia",
      image: "\uD83C\uDDEE\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1EA",
      name: "flag: Ireland",
      image: "\uD83C\uDDEE\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F1",
      name: "flag: Israel",
      image: "\uD83C\uDDEE\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F2",
      name: "flag: Isle of Man",
      image: "\uD83C\uDDEE\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F3",
      name: "flag: India",
      image: "\uD83C\uDDEE\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F4",
      name: "flag: British Indian Ocean Territory",
      image: "\uD83C\uDDEE\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F6",
      name: "flag: Iraq",
      image: "\uD83C\uDDEE\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F7",
      name: "flag: Iran",
      image: "\uD83C\uDDEE\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F8",
      name: "flag: Iceland",
      image: "\uD83C\uDDEE\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F9",
      name: "flag: Italy",
      image: "\uD83C\uDDEE\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1EA",
      name: "flag: Jersey",
      image: "\uD83C\uDDEF\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1F2",
      name: "flag: Jamaica",
      image: "\uD83C\uDDEF\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1F4",
      name: "flag: Jordan",
      image: "\uD83C\uDDEF\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1F5",
      name: "flag: Japan",
      image: "\uD83C\uDDEF\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1EA",
      name: "flag: Kenya",
      image: "\uD83C\uDDF0\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1EC",
      name: "flag: Kyrgyzstan",
      image: "\uD83C\uDDF0\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1ED",
      name: "flag: Cambodia",
      image: "\uD83C\uDDF0\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1EE",
      name: "flag: Kiribati",
      image: "\uD83C\uDDF0\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F2",
      name: "flag: Comoros",
      image: "\uD83C\uDDF0\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F3",
      name: "flag: St. Kitts & Nevis",
      image: "\uD83C\uDDF0\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F5",
      name: "flag: North Korea",
      image: "\uD83C\uDDF0\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F7",
      name: "flag: South Korea",
      image: "\uD83C\uDDF0\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1FC",
      name: "flag: Kuwait",
      image: "\uD83C\uDDF0\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1FE",
      name: "flag: Cayman Islands",
      image: "\uD83C\uDDF0\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1FF",
      name: "flag: Kazakhstan",
      image: "\uD83C\uDDF0\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1E6",
      name: "flag: Laos",
      image: "\uD83C\uDDF1\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1E7",
      name: "flag: Lebanon",
      image: "\uD83C\uDDF1\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1E8",
      name: "flag: St. Lucia",
      image: "\uD83C\uDDF1\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1EE",
      name: "flag: Liechtenstein",
      image: "\uD83C\uDDF1\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F0",
      name: "flag: Sri Lanka",
      image: "\uD83C\uDDF1\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F7",
      name: "flag: Liberia",
      image: "\uD83C\uDDF1\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F8",
      name: "flag: Lesotho",
      image: "\uD83C\uDDF1\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F9",
      name: "flag: Lithuania",
      image: "\uD83C\uDDF1\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1FA",
      name: "flag: Luxembourg",
      image: "\uD83C\uDDF1\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1FB",
      name: "flag: Latvia",
      image: "\uD83C\uDDF1\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1FE",
      name: "flag: Libya",
      image: "\uD83C\uDDF1\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1E6",
      name: "flag: Morocco",
      image: "\uD83C\uDDF2\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1E8",
      name: "flag: Monaco",
      image: "\uD83C\uDDF2\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1E9",
      name: "flag: Moldova",
      image: "\uD83C\uDDF2\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1EA",
      name: "flag: Montenegro",
      image: "\uD83C\uDDF2\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1EB",
      name: "flag: St. Martin",
      image: "\uD83C\uDDF2\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1EC",
      name: "flag: Madagascar",
      image: "\uD83C\uDDF2\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1ED",
      name: "flag: Marshall Islands",
      image: "\uD83C\uDDF2\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F0",
      name: "flag: North Macedonia",
      image: "\uD83C\uDDF2\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F1",
      name: "flag: Mali",
      image: "\uD83C\uDDF2\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F2",
      name: "flag: Myanmar (Burma)",
      image: "\uD83C\uDDF2\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F3",
      name: "flag: Mongolia",
      image: "\uD83C\uDDF2\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F4",
      name: "flag: Macao SAR China",
      image: "\uD83C\uDDF2\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F5",
      name: "flag: Northern Mariana Islands",
      image: "\uD83C\uDDF2\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F6",
      name: "flag: Martinique",
      image: "\uD83C\uDDF2\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F7",
      name: "flag: Mauritania",
      image: "\uD83C\uDDF2\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F8",
      name: "flag: Montserrat",
      image: "\uD83C\uDDF2\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F9",
      name: "flag: Malta",
      image: "\uD83C\uDDF2\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FA",
      name: "flag: Mauritius",
      image: "\uD83C\uDDF2\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FB",
      name: "flag: Maldives",
      image: "\uD83C\uDDF2\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FC",
      name: "flag: Malawi",
      image: "\uD83C\uDDF2\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FD",
      name: "flag: Mexico",
      image: "\uD83C\uDDF2\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FE",
      name: "flag: Malaysia",
      image: "\uD83C\uDDF2\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FF",
      name: "flag: Mozambique",
      image: "\uD83C\uDDF2\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1E6",
      name: "flag: Namibia",
      image: "\uD83C\uDDF3\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1E8",
      name: "flag: New Caledonia",
      image: "\uD83C\uDDF3\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EA",
      name: "flag: Niger",
      image: "\uD83C\uDDF3\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EB",
      name: "flag: Norfolk Island",
      image: "\uD83C\uDDF3\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EC",
      name: "flag: Nigeria",
      image: "\uD83C\uDDF3\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EE",
      name: "flag: Nicaragua",
      image: "\uD83C\uDDF3\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F1",
      name: "flag: Netherlands",
      image: "\uD83C\uDDF3\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F4",
      name: "flag: Norway",
      image: "\uD83C\uDDF3\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F5",
      name: "flag: Nepal",
      image: "\uD83C\uDDF3\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F7",
      name: "flag: Nauru",
      image: "\uD83C\uDDF3\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1FA",
      name: "flag: Niue",
      image: "\uD83C\uDDF3\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1FF",
      name: "flag: New Zealand",
      image: "\uD83C\uDDF3\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F4 U+1F1F2",
      name: "flag: Oman",
      image: "\uD83C\uDDF4\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1E6",
      name: "flag: Panama",
      image: "\uD83C\uDDF5\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1EA",
      name: "flag: Peru",
      image: "\uD83C\uDDF5\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1EB",
      name: "flag: French Polynesia",
      image: "\uD83C\uDDF5\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1EC",
      name: "flag: Papua New Guinea",
      image: "\uD83C\uDDF5\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1ED",
      name: "flag: Philippines",
      image: "\uD83C\uDDF5\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F0",
      name: "flag: Pakistan",
      image: "\uD83C\uDDF5\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F1",
      name: "flag: Poland",
      image: "\uD83C\uDDF5\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F2",
      name: "flag: St. Pierre & Miquelon",
      image: "\uD83C\uDDF5\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F3",
      name: "flag: Pitcairn Islands",
      image: "\uD83C\uDDF5\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F7",
      name: "flag: Puerto Rico",
      image: "\uD83C\uDDF5\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F8",
      name: "flag: Palestinian Territories",
      image: "\uD83C\uDDF5\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F9",
      name: "flag: Portugal",
      image: "\uD83C\uDDF5\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1FC",
      name: "flag: Palau",
      image: "\uD83C\uDDF5\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1FE",
      name: "flag: Paraguay",
      image: "\uD83C\uDDF5\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F6 U+1F1E6",
      name: "flag: Qatar",
      image: "\uD83C\uDDF6\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1EA",
      name: "flag: Réunion",
      image: "\uD83C\uDDF7\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1F4",
      name: "flag: Romania",
      image: "\uD83C\uDDF7\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1F8",
      name: "flag: Serbia",
      image: "\uD83C\uDDF7\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1FA",
      name: "flag: Russia",
      image: "\uD83C\uDDF7\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1FC",
      name: "flag: Rwanda",
      image: "\uD83C\uDDF7\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E6",
      name: "flag: Saudi Arabia",
      image: "\uD83C\uDDF8\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E7",
      name: "flag: Solomon Islands",
      image: "\uD83C\uDDF8\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E8",
      name: "flag: Seychelles",
      image: "\uD83C\uDDF8\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E9",
      name: "flag: Sudan",
      image: "\uD83C\uDDF8\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EA",
      name: "flag: Sweden",
      image: "\uD83C\uDDF8\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EC",
      name: "flag: Singapore",
      image: "\uD83C\uDDF8\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1ED",
      name: "flag: St. Helena",
      image: "\uD83C\uDDF8\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EE",
      name: "flag: Slovenia",
      image: "\uD83C\uDDF8\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EF",
      name: "flag: Svalbard & Jan Mayen",
      image: "\uD83C\uDDF8\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F0",
      name: "flag: Slovakia",
      image: "\uD83C\uDDF8\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F1",
      name: "flag: Sierra Leone",
      image: "\uD83C\uDDF8\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F2",
      name: "flag: San Marino",
      image: "\uD83C\uDDF8\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F3",
      name: "flag: Senegal",
      image: "\uD83C\uDDF8\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F4",
      name: "flag: Somalia",
      image: "\uD83C\uDDF8\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F7",
      name: "flag: Suriname",
      image: "\uD83C\uDDF8\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F8",
      name: "flag: South Sudan",
      image: "\uD83C\uDDF8\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F9",
      name: "flag: São Tomé & Príncipe",
      image: "\uD83C\uDDF8\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FB",
      name: "flag: El Salvador",
      image: "\uD83C\uDDF8\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FD",
      name: "flag: Sint Maarten",
      image: "\uD83C\uDDF8\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FE",
      name: "flag: Syria",
      image: "\uD83C\uDDF8\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FF",
      name: "flag: Eswatini",
      image: "\uD83C\uDDF8\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1E6",
      name: "flag: Tristan da Cunha",
      image: "\uD83C\uDDF9\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1E8",
      name: "flag: Turks & Caicos Islands",
      image: "\uD83C\uDDF9\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1E9",
      name: "flag: Chad",
      image: "\uD83C\uDDF9\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1EB",
      name: "flag: French Southern Territories",
      image: "\uD83C\uDDF9\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1EC",
      name: "flag: Togo",
      image: "\uD83C\uDDF9\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1ED",
      name: "flag: Thailand",
      image: "\uD83C\uDDF9\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1EF",
      name: "flag: Tajikistan",
      image: "\uD83C\uDDF9\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F0",
      name: "flag: Tokelau",
      image: "\uD83C\uDDF9\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F1",
      name: "flag: Timor-Leste",
      image: "\uD83C\uDDF9\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F2",
      name: "flag: Turkmenistan",
      image: "\uD83C\uDDF9\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F3",
      name: "flag: Tunisia",
      image: "\uD83C\uDDF9\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F4",
      name: "flag: Tonga",
      image: "\uD83C\uDDF9\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F7",
      name: "flag: Turkey",
      image: "\uD83C\uDDF9\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F9",
      name: "flag: Trinidad & Tobago",
      image: "\uD83C\uDDF9\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1FB",
      name: "flag: Tuvalu",
      image: "\uD83C\uDDF9\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1FC",
      name: "flag: Taiwan",
      image: "\uD83C\uDDF9\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1FF",
      name: "flag: Tanzania",
      image: "\uD83C\uDDF9\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1E6",
      name: "flag: Ukraine",
      image: "\uD83C\uDDFA\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1EC",
      name: "flag: Uganda",
      image: "\uD83C\uDDFA\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1F2",
      name: "flag: U.S. Outlying Islands",
      image: "\uD83C\uDDFA\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1F3",
      name: "flag: United Nations",
      image: "\uD83C\uDDFA\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1F8",
      name: "flag: United States",
      image: "\uD83C\uDDFA\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1FE",
      name: "flag: Uruguay",
      image: "\uD83C\uDDFA\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1FF",
      name: "flag: Uzbekistan",
      image: "\uD83C\uDDFA\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1E6",
      name: "flag: Vatican City",
      image: "\uD83C\uDDFB\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1E8",
      name: "flag: St. Vincent & Grenadines",
      image: "\uD83C\uDDFB\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1EA",
      name: "flag: Venezuela",
      image: "\uD83C\uDDFB\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1EC",
      name: "flag: British Virgin Islands",
      image: "\uD83C\uDDFB\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1EE",
      name: "flag: U.S. Virgin Islands",
      image: "\uD83C\uDDFB\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1F3",
      name: "flag: Vietnam",
      image: "\uD83C\uDDFB\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1FA",
      name: "flag: Vanuatu",
      image: "\uD83C\uDDFB\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1FC U+1F1EB",
      name: "flag: Wallis & Futuna",
      image: "\uD83C\uDDFC\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1FC U+1F1F8",
      name: "flag: Samoa",
      image: "\uD83C\uDDFC\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1FD U+1F1F0",
      name: "flag: Kosovo",
      image: "\uD83C\uDDFD\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1FE U+1F1EA",
      name: "flag: Yemen",
      image: "\uD83C\uDDFE\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1FE U+1F1F9",
      name: "flag: Mayotte",
      image: "\uD83C\uDDFE\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1FF U+1F1E6",
      name: "flag: South Africa",
      image: "\uD83C\uDDFF\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1FF U+1F1F2",
      name: "flag: Zambia",
      image: "\uD83C\uDDFF\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1FF U+1F1FC",
      name: "flag: Zimbabwe",
      image: "\uD83C\uDDFF\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+E0067 U+E0062 U+E0065 U+E006E U+E0067 U+E007F",
      name: "flag: England",
      image: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+E0067 U+E0062 U+E0073 U+E0063 U+E0074 U+E007F",
      name: "flag: Scotland",
      image: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+E0067 U+E0062 U+E0077 U+E006C U+E0073 U+E007F",
      name: "flag: Wales",
      image: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73\uDB40\uDC7F",
      category: "Flags"
    }
  ];
  emojis.forEach;
  function generateEmojis(count) {
    const emojiList = [];
    for (let i2 = 0;i2 < count; i2++) {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      const emoji = emojis[randomIndex];
      emojiList.push(emoji);
    }
    return emojiList;
  }
  module.exports = {
    generateEmojis
  };
});

// ../src/cycles/data-update/data-update.ts
function filterArray(array, cond) {
  let size = 0;
  for (let i = 0;i < array.length; i++) {
    array[size] = array[i];
    if (cond(array[i])) {
      size++;
    }
  }
  array.length = size;
}
function commitUpdates({ root, incomingUpdates, outgoingUpdates, properties }, consolidate) {
  if (consolidate) {
    consolidateUpdates(incomingUpdates, outgoingUpdates);
  }
  if (!incomingUpdates.length) {
    return;
  }
  const updatedPaths = {};
  incomingUpdates.forEach((update) => {
    if (!update.confirmed) {
      return;
    }
    const parts = update.path.split("/");
    const leaf = getLeafObject(root, parts, 1, true, properties, updatedPaths);
    const prop = parts[parts.length - 1];
    const value = translateValue(update.value, properties);
    if (value === undefined) {
      delete leaf[prop];
      updatedPaths[parts.slice(0, parts.length).join("/")] = undefined;
      updatedPaths[parts.slice(0, parts.length - 1).join("/")] = leaf;
      cleanupRoot(root, parts, 0, updatedPaths);
    } else {
      if (typeof leaf[prop] === undefined) {
        updatedPaths[parts.slice(0, parts.length).join("/")] = leaf;
      }
      leaf[prop] = value;
    }
    updatedPaths[update.path] = leaf[prop];
  });
  filterArray(incomingUpdates, (update) => !update.confirmed);
  return updatedPaths;
}
function cleanupRoot(root, parts, index, updatedPaths) {
  if (!root || typeof root !== "object" || Array.isArray(root)) {
    return false;
  }
  if (cleanupRoot(root[parts[index]], parts, index + 1, updatedPaths)) {
    delete root[parts[index]];
    const leafPath = parts.slice(0, index + 1);
    updatedPaths[leafPath.join("/")] = undefined;
    leafPath.pop();
    updatedPaths[leafPath.join("/")] = root;
  }
  return Object.keys(root).length === 0;
}
function compareUpdates(a, b) {
  if (a.confirmed !== b.confirmed) {
    return a.confirmed - b.confirmed;
  }
  return a.path.localeCompare(b.path);
}
var _map = new Map;
function consolidateUpdates(incoming, outgoing) {
  if (!incoming.length && !outgoing.length) {
    return;
  }
  _map.clear();
  for (let i = 0;i < incoming.length; i++) {
    const update = incoming[i];
    if (update.confirmed) {
      const existingUpdate = _map.get(update.path);
      if (!existingUpdate || compareUpdates(existingUpdate, update) < 0) {
        _map.set(update.path, update);
      }
    }
  }
  for (let i = 0;i < outgoing.length; i++) {
    const update = outgoing[i];
    if (update.confirmed) {
      const existingUpdate = _map.get(update.path);
      if (!existingUpdate || compareUpdates(existingUpdate, update) < 0) {
        _map.set(update.path, update);
      }
    }
  }
  filterArray(incoming, (update) => !update.confirmed || _map.get(update.path) === update);
  filterArray(outgoing, (update) => !update.confirmed || _map.get(update.path) === update);
  _map.clear();
}
function getLeafObject(obj, parts, offset, autoCreate, properties, updatedPaths) {
  let current = obj;
  const pathParts = [];
  for (let i = 0;i < parts.length - offset; i++) {
    const prop = parts[i];
    const value = translateProp(current, prop, properties, autoCreate, updatedPaths, parts.slice(0, i + 1).join("/"));
    if (value === undefined) {
      return value;
    }
    current = value;
  }
  return current;
}
function translateValue(value, properties) {
  if (typeof value !== "string") {
    return value;
  }
  if (value.startsWith("~{") && value.endsWith("}")) {
    switch (value) {
      default:
        const group = value.match(/~\{([^}]+)\}/);
        if (group) {
          return properties[group[1]];
        }
    }
  }
  return value;
}
function translateProp(obj, prop, properties, autoCreate = false, updatedPaths, path) {
  let value = obj[prop];
  if (value === undefined && autoCreate) {
    value = obj[prop] = {};
    if (updatedPaths && path) {
      updatedPaths[path] = value;
    }
  }
  return value;
}
// ../node_modules/@msgpack/msgpack/dist.esm/utils/utf8.mjs
function utf8Count(str) {
  const strLength = str.length;
  let byteLength = 0;
  let pos = 0;
  while (pos < strLength) {
    let value = str.charCodeAt(pos++);
    if ((value & 4294967168) === 0) {
      byteLength++;
      continue;
    } else if ((value & 4294965248) === 0) {
      byteLength += 2;
    } else {
      if (value >= 55296 && value <= 56319) {
        if (pos < strLength) {
          const extra = str.charCodeAt(pos);
          if ((extra & 64512) === 56320) {
            ++pos;
            value = ((value & 1023) << 10) + (extra & 1023) + 65536;
          }
        }
      }
      if ((value & 4294901760) === 0) {
        byteLength += 3;
      } else {
        byteLength += 4;
      }
    }
  }
  return byteLength;
}
function utf8EncodeJs(str, output, outputOffset) {
  const strLength = str.length;
  let offset = outputOffset;
  let pos = 0;
  while (pos < strLength) {
    let value = str.charCodeAt(pos++);
    if ((value & 4294967168) === 0) {
      output[offset++] = value;
      continue;
    } else if ((value & 4294965248) === 0) {
      output[offset++] = value >> 6 & 31 | 192;
    } else {
      if (value >= 55296 && value <= 56319) {
        if (pos < strLength) {
          const extra = str.charCodeAt(pos);
          if ((extra & 64512) === 56320) {
            ++pos;
            value = ((value & 1023) << 10) + (extra & 1023) + 65536;
          }
        }
      }
      if ((value & 4294901760) === 0) {
        output[offset++] = value >> 12 & 15 | 224;
        output[offset++] = value >> 6 & 63 | 128;
      } else {
        output[offset++] = value >> 18 & 7 | 240;
        output[offset++] = value >> 12 & 63 | 128;
        output[offset++] = value >> 6 & 63 | 128;
      }
    }
    output[offset++] = value & 63 | 128;
  }
}
var sharedTextEncoder = new TextEncoder;
var TEXT_ENCODER_THRESHOLD = 50;
function utf8EncodeTE(str, output, outputOffset) {
  sharedTextEncoder.encodeInto(str, output.subarray(outputOffset));
}
function utf8Encode(str, output, outputOffset) {
  if (str.length > TEXT_ENCODER_THRESHOLD) {
    utf8EncodeTE(str, output, outputOffset);
  } else {
    utf8EncodeJs(str, output, outputOffset);
  }
}
var CHUNK_SIZE = 4096;
function utf8DecodeJs(bytes, inputOffset, byteLength) {
  let offset = inputOffset;
  const end = offset + byteLength;
  const units = [];
  let result = "";
  while (offset < end) {
    const byte1 = bytes[offset++];
    if ((byte1 & 128) === 0) {
      units.push(byte1);
    } else if ((byte1 & 224) === 192) {
      const byte2 = bytes[offset++] & 63;
      units.push((byte1 & 31) << 6 | byte2);
    } else if ((byte1 & 240) === 224) {
      const byte2 = bytes[offset++] & 63;
      const byte3 = bytes[offset++] & 63;
      units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
    } else if ((byte1 & 248) === 240) {
      const byte2 = bytes[offset++] & 63;
      const byte3 = bytes[offset++] & 63;
      const byte4 = bytes[offset++] & 63;
      let unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (unit > 65535) {
        unit -= 65536;
        units.push(unit >>> 10 & 1023 | 55296);
        unit = 56320 | unit & 1023;
      }
      units.push(unit);
    } else {
      units.push(byte1);
    }
    if (units.length >= CHUNK_SIZE) {
      result += String.fromCharCode(...units);
      units.length = 0;
    }
  }
  if (units.length > 0) {
    result += String.fromCharCode(...units);
  }
  return result;
}
var sharedTextDecoder = new TextDecoder;
var TEXT_DECODER_THRESHOLD = 200;
function utf8DecodeTD(bytes, inputOffset, byteLength) {
  const stringBytes = bytes.subarray(inputOffset, inputOffset + byteLength);
  return sharedTextDecoder.decode(stringBytes);
}
function utf8Decode(bytes, inputOffset, byteLength) {
  if (byteLength > TEXT_DECODER_THRESHOLD) {
    return utf8DecodeTD(bytes, inputOffset, byteLength);
  } else {
    return utf8DecodeJs(bytes, inputOffset, byteLength);
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/ExtData.mjs
class ExtData {
  type;
  data;
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/DecodeError.mjs
class DecodeError extends Error {
  constructor(message) {
    super(message);
    const proto = Object.create(DecodeError.prototype);
    Object.setPrototypeOf(this, proto);
    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: DecodeError.name
    });
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/utils/int.mjs
var UINT32_MAX = 4294967295;
function setUint64(view, offset, value) {
  const high = value / 4294967296;
  const low = value;
  view.setUint32(offset, high);
  view.setUint32(offset + 4, low);
}
function setInt64(view, offset, value) {
  const high = Math.floor(value / 4294967296);
  const low = value;
  view.setUint32(offset, high);
  view.setUint32(offset + 4, low);
}
function getInt64(view, offset) {
  const high = view.getInt32(offset);
  const low = view.getUint32(offset + 4);
  return high * 4294967296 + low;
}
function getUint64(view, offset) {
  const high = view.getUint32(offset);
  const low = view.getUint32(offset + 4);
  return high * 4294967296 + low;
}

// ../node_modules/@msgpack/msgpack/dist.esm/timestamp.mjs
var EXT_TIMESTAMP = -1;
var TIMESTAMP32_MAX_SEC = 4294967296 - 1;
var TIMESTAMP64_MAX_SEC = 17179869184 - 1;
function encodeTimeSpecToTimestamp({ sec, nsec }) {
  if (sec >= 0 && nsec >= 0 && sec <= TIMESTAMP64_MAX_SEC) {
    if (nsec === 0 && sec <= TIMESTAMP32_MAX_SEC) {
      const rv = new Uint8Array(4);
      const view = new DataView(rv.buffer);
      view.setUint32(0, sec);
      return rv;
    } else {
      const secHigh = sec / 4294967296;
      const secLow = sec & 4294967295;
      const rv = new Uint8Array(8);
      const view = new DataView(rv.buffer);
      view.setUint32(0, nsec << 2 | secHigh & 3);
      view.setUint32(4, secLow);
      return rv;
    }
  } else {
    const rv = new Uint8Array(12);
    const view = new DataView(rv.buffer);
    view.setUint32(0, nsec);
    setInt64(view, 4, sec);
    return rv;
  }
}
function encodeDateToTimeSpec(date) {
  const msec = date.getTime();
  const sec = Math.floor(msec / 1000);
  const nsec = (msec - sec * 1000) * 1e6;
  const nsecInSec = Math.floor(nsec / 1e9);
  return {
    sec: sec + nsecInSec,
    nsec: nsec - nsecInSec * 1e9
  };
}
function encodeTimestampExtension(object) {
  if (object instanceof Date) {
    const timeSpec = encodeDateToTimeSpec(object);
    return encodeTimeSpecToTimestamp(timeSpec);
  } else {
    return null;
  }
}
function decodeTimestampToTimeSpec(data) {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  switch (data.byteLength) {
    case 4: {
      const sec = view.getUint32(0);
      const nsec = 0;
      return { sec, nsec };
    }
    case 8: {
      const nsec30AndSecHigh2 = view.getUint32(0);
      const secLow32 = view.getUint32(4);
      const sec = (nsec30AndSecHigh2 & 3) * 4294967296 + secLow32;
      const nsec = nsec30AndSecHigh2 >>> 2;
      return { sec, nsec };
    }
    case 12: {
      const sec = getInt64(view, 4);
      const nsec = view.getUint32(0);
      return { sec, nsec };
    }
    default:
      throw new DecodeError(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${data.length}`);
  }
}
function decodeTimestampExtension(data) {
  const timeSpec = decodeTimestampToTimeSpec(data);
  return new Date(timeSpec.sec * 1000 + timeSpec.nsec / 1e6);
}
var timestampExtension = {
  type: EXT_TIMESTAMP,
  encode: encodeTimestampExtension,
  decode: decodeTimestampExtension
};

// ../node_modules/@msgpack/msgpack/dist.esm/ExtensionCodec.mjs
class ExtensionCodec {
  static defaultCodec = new ExtensionCodec;
  __brand;
  builtInEncoders = [];
  builtInDecoders = [];
  encoders = [];
  decoders = [];
  constructor() {
    this.register(timestampExtension);
  }
  register({ type, encode, decode }) {
    if (type >= 0) {
      this.encoders[type] = encode;
      this.decoders[type] = decode;
    } else {
      const index = -1 - type;
      this.builtInEncoders[index] = encode;
      this.builtInDecoders[index] = decode;
    }
  }
  tryToEncode(object, context) {
    for (let i = 0;i < this.builtInEncoders.length; i++) {
      const encodeExt = this.builtInEncoders[i];
      if (encodeExt != null) {
        const data = encodeExt(object, context);
        if (data != null) {
          const type = -1 - i;
          return new ExtData(type, data);
        }
      }
    }
    for (let i = 0;i < this.encoders.length; i++) {
      const encodeExt = this.encoders[i];
      if (encodeExt != null) {
        const data = encodeExt(object, context);
        if (data != null) {
          const type = i;
          return new ExtData(type, data);
        }
      }
    }
    if (object instanceof ExtData) {
      return object;
    }
    return null;
  }
  decode(data, type, context) {
    const decodeExt = type < 0 ? this.builtInDecoders[-1 - type] : this.decoders[type];
    if (decodeExt) {
      return decodeExt(data, type, context);
    } else {
      return new ExtData(type, data);
    }
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/utils/typedArrays.mjs
function isArrayBufferLike(buffer) {
  return buffer instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && buffer instanceof SharedArrayBuffer;
}
function ensureUint8Array(buffer) {
  if (buffer instanceof Uint8Array) {
    return buffer;
  } else if (ArrayBuffer.isView(buffer)) {
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  } else if (isArrayBufferLike(buffer)) {
    return new Uint8Array(buffer);
  } else {
    return Uint8Array.from(buffer);
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/Encoder.mjs
var DEFAULT_MAX_DEPTH = 100;
var DEFAULT_INITIAL_BUFFER_SIZE = 2048;

class Encoder {
  extensionCodec;
  context;
  useBigInt64;
  maxDepth;
  initialBufferSize;
  sortKeys;
  forceFloat32;
  ignoreUndefined;
  forceIntegerToFloat;
  pos;
  view;
  bytes;
  entered = false;
  constructor(options) {
    this.extensionCodec = options?.extensionCodec ?? ExtensionCodec.defaultCodec;
    this.context = options?.context;
    this.useBigInt64 = options?.useBigInt64 ?? false;
    this.maxDepth = options?.maxDepth ?? DEFAULT_MAX_DEPTH;
    this.initialBufferSize = options?.initialBufferSize ?? DEFAULT_INITIAL_BUFFER_SIZE;
    this.sortKeys = options?.sortKeys ?? false;
    this.forceFloat32 = options?.forceFloat32 ?? false;
    this.ignoreUndefined = options?.ignoreUndefined ?? false;
    this.forceIntegerToFloat = options?.forceIntegerToFloat ?? false;
    this.pos = 0;
    this.view = new DataView(new ArrayBuffer(this.initialBufferSize));
    this.bytes = new Uint8Array(this.view.buffer);
  }
  clone() {
    return new Encoder({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      maxDepth: this.maxDepth,
      initialBufferSize: this.initialBufferSize,
      sortKeys: this.sortKeys,
      forceFloat32: this.forceFloat32,
      ignoreUndefined: this.ignoreUndefined,
      forceIntegerToFloat: this.forceIntegerToFloat
    });
  }
  reinitializeState() {
    this.pos = 0;
  }
  encodeSharedRef(object) {
    if (this.entered) {
      const instance = this.clone();
      return instance.encodeSharedRef(object);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.doEncode(object, 1);
      return this.bytes.subarray(0, this.pos);
    } finally {
      this.entered = false;
    }
  }
  encode(object) {
    if (this.entered) {
      const instance = this.clone();
      return instance.encode(object);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.doEncode(object, 1);
      return this.bytes.slice(0, this.pos);
    } finally {
      this.entered = false;
    }
  }
  doEncode(object, depth) {
    if (depth > this.maxDepth) {
      throw new Error(`Too deep objects in depth ${depth}`);
    }
    if (object == null) {
      this.encodeNil();
    } else if (typeof object === "boolean") {
      this.encodeBoolean(object);
    } else if (typeof object === "number") {
      if (!this.forceIntegerToFloat) {
        this.encodeNumber(object);
      } else {
        this.encodeNumberAsFloat(object);
      }
    } else if (typeof object === "string") {
      this.encodeString(object);
    } else if (this.useBigInt64 && typeof object === "bigint") {
      this.encodeBigInt64(object);
    } else {
      this.encodeObject(object, depth);
    }
  }
  ensureBufferSizeToWrite(sizeToWrite) {
    const requiredSize = this.pos + sizeToWrite;
    if (this.view.byteLength < requiredSize) {
      this.resizeBuffer(requiredSize * 2);
    }
  }
  resizeBuffer(newSize) {
    const newBuffer = new ArrayBuffer(newSize);
    const newBytes = new Uint8Array(newBuffer);
    const newView = new DataView(newBuffer);
    newBytes.set(this.bytes);
    this.view = newView;
    this.bytes = newBytes;
  }
  encodeNil() {
    this.writeU8(192);
  }
  encodeBoolean(object) {
    if (object === false) {
      this.writeU8(194);
    } else {
      this.writeU8(195);
    }
  }
  encodeNumber(object) {
    if (!this.forceIntegerToFloat && Number.isSafeInteger(object)) {
      if (object >= 0) {
        if (object < 128) {
          this.writeU8(object);
        } else if (object < 256) {
          this.writeU8(204);
          this.writeU8(object);
        } else if (object < 65536) {
          this.writeU8(205);
          this.writeU16(object);
        } else if (object < 4294967296) {
          this.writeU8(206);
          this.writeU32(object);
        } else if (!this.useBigInt64) {
          this.writeU8(207);
          this.writeU64(object);
        } else {
          this.encodeNumberAsFloat(object);
        }
      } else {
        if (object >= -32) {
          this.writeU8(224 | object + 32);
        } else if (object >= -128) {
          this.writeU8(208);
          this.writeI8(object);
        } else if (object >= -32768) {
          this.writeU8(209);
          this.writeI16(object);
        } else if (object >= -2147483648) {
          this.writeU8(210);
          this.writeI32(object);
        } else if (!this.useBigInt64) {
          this.writeU8(211);
          this.writeI64(object);
        } else {
          this.encodeNumberAsFloat(object);
        }
      }
    } else {
      this.encodeNumberAsFloat(object);
    }
  }
  encodeNumberAsFloat(object) {
    if (this.forceFloat32) {
      this.writeU8(202);
      this.writeF32(object);
    } else {
      this.writeU8(203);
      this.writeF64(object);
    }
  }
  encodeBigInt64(object) {
    if (object >= BigInt(0)) {
      this.writeU8(207);
      this.writeBigUint64(object);
    } else {
      this.writeU8(211);
      this.writeBigInt64(object);
    }
  }
  writeStringHeader(byteLength) {
    if (byteLength < 32) {
      this.writeU8(160 + byteLength);
    } else if (byteLength < 256) {
      this.writeU8(217);
      this.writeU8(byteLength);
    } else if (byteLength < 65536) {
      this.writeU8(218);
      this.writeU16(byteLength);
    } else if (byteLength < 4294967296) {
      this.writeU8(219);
      this.writeU32(byteLength);
    } else {
      throw new Error(`Too long string: ${byteLength} bytes in UTF-8`);
    }
  }
  encodeString(object) {
    const maxHeaderSize = 1 + 4;
    const byteLength = utf8Count(object);
    this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
    this.writeStringHeader(byteLength);
    utf8Encode(object, this.bytes, this.pos);
    this.pos += byteLength;
  }
  encodeObject(object, depth) {
    const ext = this.extensionCodec.tryToEncode(object, this.context);
    if (ext != null) {
      this.encodeExtension(ext);
    } else if (Array.isArray(object)) {
      this.encodeArray(object, depth);
    } else if (ArrayBuffer.isView(object)) {
      this.encodeBinary(object);
    } else if (typeof object === "object") {
      this.encodeMap(object, depth);
    } else {
      throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(object)}`);
    }
  }
  encodeBinary(object) {
    const size = object.byteLength;
    if (size < 256) {
      this.writeU8(196);
      this.writeU8(size);
    } else if (size < 65536) {
      this.writeU8(197);
      this.writeU16(size);
    } else if (size < 4294967296) {
      this.writeU8(198);
      this.writeU32(size);
    } else {
      throw new Error(`Too large binary: ${size}`);
    }
    const bytes = ensureUint8Array(object);
    this.writeU8a(bytes);
  }
  encodeArray(object, depth) {
    const size = object.length;
    if (size < 16) {
      this.writeU8(144 + size);
    } else if (size < 65536) {
      this.writeU8(220);
      this.writeU16(size);
    } else if (size < 4294967296) {
      this.writeU8(221);
      this.writeU32(size);
    } else {
      throw new Error(`Too large array: ${size}`);
    }
    for (const item of object) {
      this.doEncode(item, depth + 1);
    }
  }
  countWithoutUndefined(object, keys) {
    let count = 0;
    for (const key of keys) {
      if (object[key] !== undefined) {
        count++;
      }
    }
    return count;
  }
  encodeMap(object, depth) {
    const keys = Object.keys(object);
    if (this.sortKeys) {
      keys.sort();
    }
    const size = this.ignoreUndefined ? this.countWithoutUndefined(object, keys) : keys.length;
    if (size < 16) {
      this.writeU8(128 + size);
    } else if (size < 65536) {
      this.writeU8(222);
      this.writeU16(size);
    } else if (size < 4294967296) {
      this.writeU8(223);
      this.writeU32(size);
    } else {
      throw new Error(`Too large map object: ${size}`);
    }
    for (const key of keys) {
      const value = object[key];
      if (!(this.ignoreUndefined && value === undefined)) {
        this.encodeString(key);
        this.doEncode(value, depth + 1);
      }
    }
  }
  encodeExtension(ext) {
    if (typeof ext.data === "function") {
      const data = ext.data(this.pos + 6);
      const size2 = data.length;
      if (size2 >= 4294967296) {
        throw new Error(`Too large extension object: ${size2}`);
      }
      this.writeU8(201);
      this.writeU32(size2);
      this.writeI8(ext.type);
      this.writeU8a(data);
      return;
    }
    const size = ext.data.length;
    if (size === 1) {
      this.writeU8(212);
    } else if (size === 2) {
      this.writeU8(213);
    } else if (size === 4) {
      this.writeU8(214);
    } else if (size === 8) {
      this.writeU8(215);
    } else if (size === 16) {
      this.writeU8(216);
    } else if (size < 256) {
      this.writeU8(199);
      this.writeU8(size);
    } else if (size < 65536) {
      this.writeU8(200);
      this.writeU16(size);
    } else if (size < 4294967296) {
      this.writeU8(201);
      this.writeU32(size);
    } else {
      throw new Error(`Too large extension object: ${size}`);
    }
    this.writeI8(ext.type);
    this.writeU8a(ext.data);
  }
  writeU8(value) {
    this.ensureBufferSizeToWrite(1);
    this.view.setUint8(this.pos, value);
    this.pos++;
  }
  writeU8a(values) {
    const size = values.length;
    this.ensureBufferSizeToWrite(size);
    this.bytes.set(values, this.pos);
    this.pos += size;
  }
  writeI8(value) {
    this.ensureBufferSizeToWrite(1);
    this.view.setInt8(this.pos, value);
    this.pos++;
  }
  writeU16(value) {
    this.ensureBufferSizeToWrite(2);
    this.view.setUint16(this.pos, value);
    this.pos += 2;
  }
  writeI16(value) {
    this.ensureBufferSizeToWrite(2);
    this.view.setInt16(this.pos, value);
    this.pos += 2;
  }
  writeU32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setUint32(this.pos, value);
    this.pos += 4;
  }
  writeI32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setInt32(this.pos, value);
    this.pos += 4;
  }
  writeF32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setFloat32(this.pos, value);
    this.pos += 4;
  }
  writeF64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setFloat64(this.pos, value);
    this.pos += 8;
  }
  writeU64(value) {
    this.ensureBufferSizeToWrite(8);
    setUint64(this.view, this.pos, value);
    this.pos += 8;
  }
  writeI64(value) {
    this.ensureBufferSizeToWrite(8);
    setInt64(this.view, this.pos, value);
    this.pos += 8;
  }
  writeBigUint64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setBigUint64(this.pos, value);
    this.pos += 8;
  }
  writeBigInt64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setBigInt64(this.pos, value);
    this.pos += 8;
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/encode.mjs
function encode(value, options) {
  const encoder = new Encoder(options);
  return encoder.encodeSharedRef(value);
}

// ../node_modules/@msgpack/msgpack/dist.esm/utils/prettyByte.mjs
function prettyByte(byte) {
  return `${byte < 0 ? "-" : ""}0x${Math.abs(byte).toString(16).padStart(2, "0")}`;
}

// ../node_modules/@msgpack/msgpack/dist.esm/CachedKeyDecoder.mjs
var DEFAULT_MAX_KEY_LENGTH = 16;
var DEFAULT_MAX_LENGTH_PER_KEY = 16;

class CachedKeyDecoder {
  hit = 0;
  miss = 0;
  caches;
  maxKeyLength;
  maxLengthPerKey;
  constructor(maxKeyLength = DEFAULT_MAX_KEY_LENGTH, maxLengthPerKey = DEFAULT_MAX_LENGTH_PER_KEY) {
    this.maxKeyLength = maxKeyLength;
    this.maxLengthPerKey = maxLengthPerKey;
    this.caches = [];
    for (let i = 0;i < this.maxKeyLength; i++) {
      this.caches.push([]);
    }
  }
  canBeCached(byteLength) {
    return byteLength > 0 && byteLength <= this.maxKeyLength;
  }
  find(bytes, inputOffset, byteLength) {
    const records = this.caches[byteLength - 1];
    FIND_CHUNK:
      for (const record of records) {
        const recordBytes = record.bytes;
        for (let j = 0;j < byteLength; j++) {
          if (recordBytes[j] !== bytes[inputOffset + j]) {
            continue FIND_CHUNK;
          }
        }
        return record.str;
      }
    return null;
  }
  store(bytes, value) {
    const records = this.caches[bytes.length - 1];
    const record = { bytes, str: value };
    if (records.length >= this.maxLengthPerKey) {
      records[Math.random() * records.length | 0] = record;
    } else {
      records.push(record);
    }
  }
  decode(bytes, inputOffset, byteLength) {
    const cachedValue = this.find(bytes, inputOffset, byteLength);
    if (cachedValue != null) {
      this.hit++;
      return cachedValue;
    }
    this.miss++;
    const str = utf8DecodeJs(bytes, inputOffset, byteLength);
    const slicedCopyOfBytes = Uint8Array.prototype.slice.call(bytes, inputOffset, inputOffset + byteLength);
    this.store(slicedCopyOfBytes, str);
    return str;
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/Decoder.mjs
var STATE_ARRAY = "array";
var STATE_MAP_KEY = "map_key";
var STATE_MAP_VALUE = "map_value";
var mapKeyConverter = (key) => {
  if (typeof key === "string" || typeof key === "number") {
    return key;
  }
  throw new DecodeError("The type of key must be string or number but " + typeof key);
};

class StackPool {
  stack = [];
  stackHeadPosition = -1;
  get length() {
    return this.stackHeadPosition + 1;
  }
  top() {
    return this.stack[this.stackHeadPosition];
  }
  pushArrayState(size) {
    const state = this.getUninitializedStateFromPool();
    state.type = STATE_ARRAY;
    state.position = 0;
    state.size = size;
    state.array = new Array(size);
  }
  pushMapState(size) {
    const state = this.getUninitializedStateFromPool();
    state.type = STATE_MAP_KEY;
    state.readCount = 0;
    state.size = size;
    state.map = {};
  }
  getUninitializedStateFromPool() {
    this.stackHeadPosition++;
    if (this.stackHeadPosition === this.stack.length) {
      const partialState = {
        type: undefined,
        size: 0,
        array: undefined,
        position: 0,
        readCount: 0,
        map: undefined,
        key: null
      };
      this.stack.push(partialState);
    }
    return this.stack[this.stackHeadPosition];
  }
  release(state) {
    const topStackState = this.stack[this.stackHeadPosition];
    if (topStackState !== state) {
      throw new Error("Invalid stack state. Released state is not on top of the stack.");
    }
    if (state.type === STATE_ARRAY) {
      const partialState = state;
      partialState.size = 0;
      partialState.array = undefined;
      partialState.position = 0;
      partialState.type = undefined;
    }
    if (state.type === STATE_MAP_KEY || state.type === STATE_MAP_VALUE) {
      const partialState = state;
      partialState.size = 0;
      partialState.map = undefined;
      partialState.readCount = 0;
      partialState.type = undefined;
    }
    this.stackHeadPosition--;
  }
  reset() {
    this.stack.length = 0;
    this.stackHeadPosition = -1;
  }
}
var HEAD_BYTE_REQUIRED = -1;
var EMPTY_VIEW = new DataView(new ArrayBuffer(0));
var EMPTY_BYTES = new Uint8Array(EMPTY_VIEW.buffer);
try {
  EMPTY_VIEW.getInt8(0);
} catch (e) {
  if (!(e instanceof RangeError)) {
    throw new Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
  }
}
var MORE_DATA = new RangeError("Insufficient data");
var sharedCachedKeyDecoder = new CachedKeyDecoder;

class Decoder {
  extensionCodec;
  context;
  useBigInt64;
  rawStrings;
  maxStrLength;
  maxBinLength;
  maxArrayLength;
  maxMapLength;
  maxExtLength;
  keyDecoder;
  mapKeyConverter;
  totalPos = 0;
  pos = 0;
  view = EMPTY_VIEW;
  bytes = EMPTY_BYTES;
  headByte = HEAD_BYTE_REQUIRED;
  stack = new StackPool;
  entered = false;
  constructor(options) {
    this.extensionCodec = options?.extensionCodec ?? ExtensionCodec.defaultCodec;
    this.context = options?.context;
    this.useBigInt64 = options?.useBigInt64 ?? false;
    this.rawStrings = options?.rawStrings ?? false;
    this.maxStrLength = options?.maxStrLength ?? UINT32_MAX;
    this.maxBinLength = options?.maxBinLength ?? UINT32_MAX;
    this.maxArrayLength = options?.maxArrayLength ?? UINT32_MAX;
    this.maxMapLength = options?.maxMapLength ?? UINT32_MAX;
    this.maxExtLength = options?.maxExtLength ?? UINT32_MAX;
    this.keyDecoder = options?.keyDecoder !== undefined ? options.keyDecoder : sharedCachedKeyDecoder;
    this.mapKeyConverter = options?.mapKeyConverter ?? mapKeyConverter;
  }
  clone() {
    return new Decoder({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      rawStrings: this.rawStrings,
      maxStrLength: this.maxStrLength,
      maxBinLength: this.maxBinLength,
      maxArrayLength: this.maxArrayLength,
      maxMapLength: this.maxMapLength,
      maxExtLength: this.maxExtLength,
      keyDecoder: this.keyDecoder
    });
  }
  reinitializeState() {
    this.totalPos = 0;
    this.headByte = HEAD_BYTE_REQUIRED;
    this.stack.reset();
  }
  setBuffer(buffer) {
    const bytes = ensureUint8Array(buffer);
    this.bytes = bytes;
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    this.pos = 0;
  }
  appendBuffer(buffer) {
    if (this.headByte === HEAD_BYTE_REQUIRED && !this.hasRemaining(1)) {
      this.setBuffer(buffer);
    } else {
      const remainingData = this.bytes.subarray(this.pos);
      const newData = ensureUint8Array(buffer);
      const newBuffer = new Uint8Array(remainingData.length + newData.length);
      newBuffer.set(remainingData);
      newBuffer.set(newData, remainingData.length);
      this.setBuffer(newBuffer);
    }
  }
  hasRemaining(size) {
    return this.view.byteLength - this.pos >= size;
  }
  createExtraByteError(posToShow) {
    const { view, pos } = this;
    return new RangeError(`Extra ${view.byteLength - pos} of ${view.byteLength} byte(s) found at buffer[${posToShow}]`);
  }
  decode(buffer) {
    if (this.entered) {
      const instance = this.clone();
      return instance.decode(buffer);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.setBuffer(buffer);
      const object = this.doDecodeSync();
      if (this.hasRemaining(1)) {
        throw this.createExtraByteError(this.pos);
      }
      return object;
    } finally {
      this.entered = false;
    }
  }
  *decodeMulti(buffer) {
    if (this.entered) {
      const instance = this.clone();
      yield* instance.decodeMulti(buffer);
      return;
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.setBuffer(buffer);
      while (this.hasRemaining(1)) {
        yield this.doDecodeSync();
      }
    } finally {
      this.entered = false;
    }
  }
  async decodeAsync(stream) {
    if (this.entered) {
      const instance = this.clone();
      return instance.decodeAsync(stream);
    }
    try {
      this.entered = true;
      let decoded = false;
      let object;
      for await (const buffer of stream) {
        if (decoded) {
          this.entered = false;
          throw this.createExtraByteError(this.totalPos);
        }
        this.appendBuffer(buffer);
        try {
          object = this.doDecodeSync();
          decoded = true;
        } catch (e) {
          if (!(e instanceof RangeError)) {
            throw e;
          }
        }
        this.totalPos += this.pos;
      }
      if (decoded) {
        if (this.hasRemaining(1)) {
          throw this.createExtraByteError(this.totalPos);
        }
        return object;
      }
      const { headByte, pos, totalPos } = this;
      throw new RangeError(`Insufficient data in parsing ${prettyByte(headByte)} at ${totalPos} (${pos} in the current buffer)`);
    } finally {
      this.entered = false;
    }
  }
  decodeArrayStream(stream) {
    return this.decodeMultiAsync(stream, true);
  }
  decodeStream(stream) {
    return this.decodeMultiAsync(stream, false);
  }
  async* decodeMultiAsync(stream, isArray) {
    if (this.entered) {
      const instance = this.clone();
      yield* instance.decodeMultiAsync(stream, isArray);
      return;
    }
    try {
      this.entered = true;
      let isArrayHeaderRequired = isArray;
      let arrayItemsLeft = -1;
      for await (const buffer of stream) {
        if (isArray && arrayItemsLeft === 0) {
          throw this.createExtraByteError(this.totalPos);
        }
        this.appendBuffer(buffer);
        if (isArrayHeaderRequired) {
          arrayItemsLeft = this.readArraySize();
          isArrayHeaderRequired = false;
          this.complete();
        }
        try {
          while (true) {
            yield this.doDecodeSync();
            if (--arrayItemsLeft === 0) {
              break;
            }
          }
        } catch (e) {
          if (!(e instanceof RangeError)) {
            throw e;
          }
        }
        this.totalPos += this.pos;
      }
    } finally {
      this.entered = false;
    }
  }
  doDecodeSync() {
    DECODE:
      while (true) {
        const headByte = this.readHeadByte();
        let object;
        if (headByte >= 224) {
          object = headByte - 256;
        } else if (headByte < 192) {
          if (headByte < 128) {
            object = headByte;
          } else if (headByte < 144) {
            const size = headByte - 128;
            if (size !== 0) {
              this.pushMapState(size);
              this.complete();
              continue DECODE;
            } else {
              object = {};
            }
          } else if (headByte < 160) {
            const size = headByte - 144;
            if (size !== 0) {
              this.pushArrayState(size);
              this.complete();
              continue DECODE;
            } else {
              object = [];
            }
          } else {
            const byteLength = headByte - 160;
            object = this.decodeString(byteLength, 0);
          }
        } else if (headByte === 192) {
          object = null;
        } else if (headByte === 194) {
          object = false;
        } else if (headByte === 195) {
          object = true;
        } else if (headByte === 202) {
          object = this.readF32();
        } else if (headByte === 203) {
          object = this.readF64();
        } else if (headByte === 204) {
          object = this.readU8();
        } else if (headByte === 205) {
          object = this.readU16();
        } else if (headByte === 206) {
          object = this.readU32();
        } else if (headByte === 207) {
          if (this.useBigInt64) {
            object = this.readU64AsBigInt();
          } else {
            object = this.readU64();
          }
        } else if (headByte === 208) {
          object = this.readI8();
        } else if (headByte === 209) {
          object = this.readI16();
        } else if (headByte === 210) {
          object = this.readI32();
        } else if (headByte === 211) {
          if (this.useBigInt64) {
            object = this.readI64AsBigInt();
          } else {
            object = this.readI64();
          }
        } else if (headByte === 217) {
          const byteLength = this.lookU8();
          object = this.decodeString(byteLength, 1);
        } else if (headByte === 218) {
          const byteLength = this.lookU16();
          object = this.decodeString(byteLength, 2);
        } else if (headByte === 219) {
          const byteLength = this.lookU32();
          object = this.decodeString(byteLength, 4);
        } else if (headByte === 220) {
          const size = this.readU16();
          if (size !== 0) {
            this.pushArrayState(size);
            this.complete();
            continue DECODE;
          } else {
            object = [];
          }
        } else if (headByte === 221) {
          const size = this.readU32();
          if (size !== 0) {
            this.pushArrayState(size);
            this.complete();
            continue DECODE;
          } else {
            object = [];
          }
        } else if (headByte === 222) {
          const size = this.readU16();
          if (size !== 0) {
            this.pushMapState(size);
            this.complete();
            continue DECODE;
          } else {
            object = {};
          }
        } else if (headByte === 223) {
          const size = this.readU32();
          if (size !== 0) {
            this.pushMapState(size);
            this.complete();
            continue DECODE;
          } else {
            object = {};
          }
        } else if (headByte === 196) {
          const size = this.lookU8();
          object = this.decodeBinary(size, 1);
        } else if (headByte === 197) {
          const size = this.lookU16();
          object = this.decodeBinary(size, 2);
        } else if (headByte === 198) {
          const size = this.lookU32();
          object = this.decodeBinary(size, 4);
        } else if (headByte === 212) {
          object = this.decodeExtension(1, 0);
        } else if (headByte === 213) {
          object = this.decodeExtension(2, 0);
        } else if (headByte === 214) {
          object = this.decodeExtension(4, 0);
        } else if (headByte === 215) {
          object = this.decodeExtension(8, 0);
        } else if (headByte === 216) {
          object = this.decodeExtension(16, 0);
        } else if (headByte === 199) {
          const size = this.lookU8();
          object = this.decodeExtension(size, 1);
        } else if (headByte === 200) {
          const size = this.lookU16();
          object = this.decodeExtension(size, 2);
        } else if (headByte === 201) {
          const size = this.lookU32();
          object = this.decodeExtension(size, 4);
        } else {
          throw new DecodeError(`Unrecognized type byte: ${prettyByte(headByte)}`);
        }
        this.complete();
        const stack = this.stack;
        while (stack.length > 0) {
          const state = stack.top();
          if (state.type === STATE_ARRAY) {
            state.array[state.position] = object;
            state.position++;
            if (state.position === state.size) {
              object = state.array;
              stack.release(state);
            } else {
              continue DECODE;
            }
          } else if (state.type === STATE_MAP_KEY) {
            if (object === "__proto__") {
              throw new DecodeError("The key __proto__ is not allowed");
            }
            state.key = this.mapKeyConverter(object);
            state.type = STATE_MAP_VALUE;
            continue DECODE;
          } else {
            state.map[state.key] = object;
            state.readCount++;
            if (state.readCount === state.size) {
              object = state.map;
              stack.release(state);
            } else {
              state.key = null;
              state.type = STATE_MAP_KEY;
              continue DECODE;
            }
          }
        }
        return object;
      }
  }
  readHeadByte() {
    if (this.headByte === HEAD_BYTE_REQUIRED) {
      this.headByte = this.readU8();
    }
    return this.headByte;
  }
  complete() {
    this.headByte = HEAD_BYTE_REQUIRED;
  }
  readArraySize() {
    const headByte = this.readHeadByte();
    switch (headByte) {
      case 220:
        return this.readU16();
      case 221:
        return this.readU32();
      default: {
        if (headByte < 160) {
          return headByte - 144;
        } else {
          throw new DecodeError(`Unrecognized array type byte: ${prettyByte(headByte)}`);
        }
      }
    }
  }
  pushMapState(size) {
    if (size > this.maxMapLength) {
      throw new DecodeError(`Max length exceeded: map length (${size}) > maxMapLengthLength (${this.maxMapLength})`);
    }
    this.stack.pushMapState(size);
  }
  pushArrayState(size) {
    if (size > this.maxArrayLength) {
      throw new DecodeError(`Max length exceeded: array length (${size}) > maxArrayLength (${this.maxArrayLength})`);
    }
    this.stack.pushArrayState(size);
  }
  decodeString(byteLength, headerOffset) {
    if (!this.rawStrings || this.stateIsMapKey()) {
      return this.decodeUtf8String(byteLength, headerOffset);
    }
    return this.decodeBinary(byteLength, headerOffset);
  }
  decodeUtf8String(byteLength, headerOffset) {
    if (byteLength > this.maxStrLength) {
      throw new DecodeError(`Max length exceeded: UTF-8 byte length (${byteLength}) > maxStrLength (${this.maxStrLength})`);
    }
    if (this.bytes.byteLength < this.pos + headerOffset + byteLength) {
      throw MORE_DATA;
    }
    const offset = this.pos + headerOffset;
    let object;
    if (this.stateIsMapKey() && this.keyDecoder?.canBeCached(byteLength)) {
      object = this.keyDecoder.decode(this.bytes, offset, byteLength);
    } else {
      object = utf8Decode(this.bytes, offset, byteLength);
    }
    this.pos += headerOffset + byteLength;
    return object;
  }
  stateIsMapKey() {
    if (this.stack.length > 0) {
      const state = this.stack.top();
      return state.type === STATE_MAP_KEY;
    }
    return false;
  }
  decodeBinary(byteLength, headOffset) {
    if (byteLength > this.maxBinLength) {
      throw new DecodeError(`Max length exceeded: bin length (${byteLength}) > maxBinLength (${this.maxBinLength})`);
    }
    if (!this.hasRemaining(byteLength + headOffset)) {
      throw MORE_DATA;
    }
    const offset = this.pos + headOffset;
    const object = this.bytes.subarray(offset, offset + byteLength);
    this.pos += headOffset + byteLength;
    return object;
  }
  decodeExtension(size, headOffset) {
    if (size > this.maxExtLength) {
      throw new DecodeError(`Max length exceeded: ext length (${size}) > maxExtLength (${this.maxExtLength})`);
    }
    const extType = this.view.getInt8(this.pos + headOffset);
    const data = this.decodeBinary(size, headOffset + 1);
    return this.extensionCodec.decode(data, extType, this.context);
  }
  lookU8() {
    return this.view.getUint8(this.pos);
  }
  lookU16() {
    return this.view.getUint16(this.pos);
  }
  lookU32() {
    return this.view.getUint32(this.pos);
  }
  readU8() {
    const value = this.view.getUint8(this.pos);
    this.pos++;
    return value;
  }
  readI8() {
    const value = this.view.getInt8(this.pos);
    this.pos++;
    return value;
  }
  readU16() {
    const value = this.view.getUint16(this.pos);
    this.pos += 2;
    return value;
  }
  readI16() {
    const value = this.view.getInt16(this.pos);
    this.pos += 2;
    return value;
  }
  readU32() {
    const value = this.view.getUint32(this.pos);
    this.pos += 4;
    return value;
  }
  readI32() {
    const value = this.view.getInt32(this.pos);
    this.pos += 4;
    return value;
  }
  readU64() {
    const value = getUint64(this.view, this.pos);
    this.pos += 8;
    return value;
  }
  readI64() {
    const value = getInt64(this.view, this.pos);
    this.pos += 8;
    return value;
  }
  readU64AsBigInt() {
    const value = this.view.getBigUint64(this.pos);
    this.pos += 8;
    return value;
  }
  readI64AsBigInt() {
    const value = this.view.getBigInt64(this.pos);
    this.pos += 8;
    return value;
  }
  readF32() {
    const value = this.view.getFloat32(this.pos);
    this.pos += 4;
    return value;
  }
  readF64() {
    const value = this.view.getFloat64(this.pos);
    this.pos += 8;
    return value;
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/decode.mjs
function decode(buffer, options) {
  const decoder = new Decoder(options);
  return decoder.decode(buffer);
}

// ../src/core/Processor.ts
class Processor {
  outingCom = new Set;
  connectComm(comm) {
    this.outingCom.add(comm);
    return () => {
      this.outingCom.delete(comm);
    };
  }
  performCycle(context) {
    consolidateUpdates(context.incomingUpdates, context.outgoingUpdates);
    this.sendOutgoingUpdate(context);
    return commitUpdates(context);
  }
  receivedData(data, context) {
    const payload = decode(data);
    if (!payload.updates?.length)
      return;
    this.receiveIncomingUpdates(payload.updates, context);
    context.onIncomingUpdatesReceived?.(payload.updates);
  }
  sendOutgoingUpdate(context) {
    if (!context.outgoingUpdates.length)
      return;
    context.outgoingUpdates.forEach((update) => {
      update.path = this.fixPath(update.path, context);
    });
    const confirmedUpdates = context.outgoingUpdates.filter(({ confirmed }) => confirmed);
    this.receiveIncomingUpdates(confirmedUpdates, context);
    const peerSet = new Set;
    context.outgoingUpdates.forEach((update) => peerSet.add(update.peer));
    peerSet.forEach((peer) => {
      this.outingCom.forEach((comm) => {
        comm.send(encode({
          updates: context.outgoingUpdates.filter((update) => update.peer === peer)
        }), peer);
      });
    });
    context.outgoingUpdates.length = 0;
  }
  receiveIncomingUpdates(updates, context) {
    if (!updates?.length)
      return;
    context.incomingUpdates.push(...updates);
  }
  fixPath(path, context) {
    const split = path.split("/");
    return split.map((part) => translateValue(part, context.properties)).join("/");
  }
}
// ../src/cycles/data-update/data-manager.ts
var NO_OBJ = {};
function getData(root, path, properties) {
  const parts = path.split("/");
  return getLeafObject(root, parts, 0, false, properties);
}
function setData(now, outgoingUpdates, path, value, options = NO_OBJ) {
  const update = { path, value, confirmed: 0 };
  if (options.peer)
    update.peer = options.peer;
  if (options.active) {
    update.confirmed = now;
  }
  outgoingUpdates.push(update);
}
// ../src/observer/Observer.ts
class Observer {
  paths;
  observerManagger;
  multiValues;
  #partsArrays;
  #previousValues = [];
  #changeCallbacks = new Set;
  #addedElementsCallback = new Set;
  #deletedElementsCallback = new Set;
  initialized = false;
  constructor(paths, observerManagger, multiValues = false) {
    this.paths = paths;
    this.observerManagger = observerManagger;
    this.multiValues = multiValues;
    this.#partsArrays = paths.map((p) => p === undefined ? [] : p.split("/"));
    this.#previousValues = paths.map(() => {
      return;
    });
  }
  onChange(callback) {
    this.#changeCallbacks.add(callback);
    return this;
  }
  onElementsAdded(callback) {
    this.#addedElementsCallback.add(callback);
    return this;
  }
  onElementsDeleted(callback) {
    this.#deletedElementsCallback.add(callback);
    return this;
  }
  #valuesChanged(context, updates) {
    const newValues = this.paths.map((path, index) => updates && (path in updates) ? updates[path] : getLeafObject(context.root, this.#partsArrays[index], 0, false, context.properties));
    if (this.#previousValues.every((prev, index) => {
      const newValue = newValues[index];
      if (prev === newValue && typeof newValue !== "object") {
        return true;
      }
      if (Array.isArray(prev) && Array.isArray(newValue) && prev.length === newValue.length && prev.every((elem, idx) => elem === newValue[idx])) {
        return true;
      }
      return false;
    })) {
      return null;
    }
    return newValues;
  }
  triggerIfChanged(context, updates) {
    const newValues = !this.paths.length ? undefined : this.#valuesChanged(context, this.initialized ? updates : {});
    if (!newValues) {
      return;
    }
    const previousValues = this.#previousValues;
    this.#previousValues = newValues;
    this.#changeCallbacks.forEach((callback) => callback(this.multiValues ? newValues : newValues[0], this.multiValues ? previousValues : previousValues[0]));
    if (this.#addedElementsCallback && newValues.some((val) => Array.isArray(val))) {
      let hasNewElements = false;
      const newElementsArray = newValues.map((val, index) => {
        if (Array.isArray(val)) {
          const previousSet = new Set(Array.isArray(previousValues[index]) ? previousValues[index] : []);
          const newElements = val.filter((clientId) => !previousSet.has(clientId));
          if (newElements.length) {
            hasNewElements = true;
          }
          return newElements;
        }
      });
      if (hasNewElements) {
        this.#addedElementsCallback.forEach((callback) => callback(this.multiValues ? newElementsArray : newElementsArray[0]));
      }
    }
    if (this.#deletedElementsCallback && previousValues.some((val) => Array.isArray(val))) {
      let hasDeletedElements = false;
      const deletedElementsArray = previousValues.map((prev, index) => {
        if (Array.isArray(prev)) {
          const currentSet = new Set(Array.isArray(newValues[index]) ? newValues[index] : []);
          const deletedElements = prev.filter((clientId) => !currentSet.has(clientId));
          if (deletedElements.length) {
            hasDeletedElements = true;
          }
          return deletedElements;
        }
      });
      if (hasDeletedElements) {
        this.#deletedElementsCallback.forEach((callback) => callback(this.multiValues ? deletedElementsArray : deletedElementsArray[0]));
      }
    }
    this.initialized = true;
  }
  close() {
    this.observerManagger.removeObserver(this);
  }
}
// ../src/observer/ObserverManager.ts
class ObserverManager {
  observers = new Map;
  ensurePath(path) {
    const obsSet = this.observers.get(path);
    if (obsSet) {
      return obsSet;
    }
    const observerSet = new Set;
    this.observers.set(path, observerSet);
    return observerSet;
  }
  observe(paths, multi) {
    const observer = new Observer(paths, this, multi);
    paths.forEach((path) => {
      const obsSet = this.ensurePath(path);
      obsSet.add(observer);
    });
    return observer;
  }
  #tempObsTriggered = new Set;
  triggerObservers(context, updates) {
    for (const path in updates) {
      this.observers.get(path)?.forEach((observer) => this.#tempObsTriggered.add(observer));
    }
    this.#tempObsTriggered.forEach((o) => o.triggerIfChanged(context, updates));
    this.#tempObsTriggered.clear();
  }
  removeObserver(observer) {
    observer.paths.forEach((path) => {
      const obsSet = this.observers.get(path);
      obsSet?.delete(observer);
      if (!obsSet?.size) {
        this.observers.delete(path);
      }
    });
  }
  close() {
    this.observers.forEach((obsSet) => obsSet.forEach((o) => o.close()));
    this.observers.clear();
  }
}
// ../src/clients/CommInterfaceHook.ts
function deepShareData(context, pathParts, obj, peer, now, peerProps) {
  if (typeof obj === "object" && obj && Object.values(obj).length) {
    Object.entries(obj).forEach(([key, value]) => {
      deepShareData(context, [...pathParts, key], value, peer, now, peerProps);
    });
  } else {
    setData(now, context.outgoingUpdates, pathParts.join("/"), obj, peerProps);
  }
}
function hookCommInterface(context, comm, processor) {
  const removeOnMessage = comm.onMessage((buffer) => {
    processor.receivedData(buffer, context);
  });
  const removeOnNewClient = comm.onNewClient((peer) => {
    deepShareData(context, [], context.root, peer, Date.now(), { active: true, peer });
  });
  const disconnectComm = processor.connectComm(comm);
  return {
    disconnect: () => {
      removeOnMessage();
      removeOnNewClient();
      disconnectComm();
    }
  };
}

// ../src/core/Program.ts
var ACTIVE = {
  active: true
};

class Program {
  userId;
  root;
  incomingUpdates = [];
  outgoingUpdates = [];
  properties;
  processor = new Processor;
  observerManager = new ObserverManager;
  onIncomingUpdatesReceived;
  constructor({ userId, root, properties, onDataCycle }) {
    this.userId = userId;
    this.root = root ?? {};
    this.properties = properties ?? {};
    this.properties.self = userId;
    this.onDataCycle = onDataCycle;
  }
  connectComm(comm) {
    return hookCommInterface(this, comm, this.processor);
  }
  performCycle() {
    const updates = this.processor.performCycle(this);
    if (updates) {
      this.observerManager.triggerObservers(this, updates);
      this.onDataCycle?.();
    }
  }
  observe(paths) {
    const multi = Array.isArray(paths);
    const pathArray = paths === undefined ? [] : multi ? paths : [paths];
    return this.observerManager.observe(pathArray, multi);
  }
  removeObserver(observer) {
    this.observerManager.removeObserver(observer);
  }
  setData(path, value) {
    if (typeof value === "function") {
      const oldValue = getData(this.root, path, this.properties);
      value = value(oldValue);
      if (oldValue === value) {
        return;
      }
    }
    setData(Date.now(), this.outgoingUpdates, path, value, ACTIVE);
  }
}
// node_modules/@dobuki/hello-worker/dist/index.js
function n(Y) {
  let { userId: Z, appId: x, room: E, host: N, autoRejoin: q = true, logLine: C } = Y, K = false, _ = 0, Q, S, F = true, V = new Map, $ = `wss://${N}/room/${x}/${E}?userId=${encodeURIComponent(Z)}`;
  function J() {
    if (K)
      return;
    Q = new WebSocket($), Q.onopen = () => {
      if (F)
        Y.onOpen?.(), F = false;
      _ = 0;
    }, Q.onmessage = (H) => {
      try {
        let c = JSON.parse(H.data);
        if (C?.("\uD83D\uDDA5️ ➡️ \uD83D\uDC64", c), c.type === "peer-joined" || c.type === "peer-left")
          O(c.users);
        else if (c.peerId && c.userId)
          Y.onMessage(c.type, c.payload, { userId: c.userId, peerId: c.peerId, receive: (T, B) => A(T, c.peerId, B) });
      } catch {
        C?.("⚠️ ERROR", { error: "invalid-json" });
      }
    }, Q.onclose = (H) => {
      let T = [1001, 1006, 1011, 1012, 1013].includes(H.code);
      if (q && !K && T) {
        let B = Math.min(Math.pow(2, _) * 1000, 30000), b = Math.random() * 1000, W = B + b;
        C?.("\uD83D\uDD04 RECONNECTING", { attempt: _ + 1, delayMs: Math.round(W) }), _++, S = setTimeout(J, W);
      } else
        Y.onClose?.({ code: H.code, reason: H.reason, wasClean: H.wasClean });
    }, Q.onerror = () => Y.onError?.();
  }
  function A(H, c, T) {
    if (K || Q.readyState !== WebSocket.OPEN)
      return false;
    let B = { type: H, to: c, payload: T };
    return Q.send(JSON.stringify(B)), C?.("\uD83D\uDC64 ➡️ \uD83D\uDDA5️", B), true;
  }
  function O(H) {
    let c = [], T = [], B = new Set;
    H.forEach(({ userId: b, peerId: W }) => {
      if (b === Z)
        return;
      if (!V.has(W)) {
        let f = { userId: b, peerId: W, receive: (D, z) => A(D, W, z) };
        V.set(W, f), c.push(f);
      }
      B.add(W);
    });
    for (let [b, W] of V.entries())
      if (!B.has(b))
        V.delete(b), T.push({ peerId: b, userId: W.userId });
    if (c.length)
      Y.onPeerJoined(c);
    if (T.length)
      Y.onPeerLeft(T);
  }
  return J(), { exitRoom: () => {
    K = true, clearTimeout(S), Q.close();
  } };
}
function R({ userId: Y, appId: Z, room: x, host: E, autoRejoin: N = true, onOpen: q, onClose: C, onError: K, onPeerJoined: _, onPeerLeft: Q, onMessage: S, logLine: F, workerUrl: V }) {
  if (!V)
    return console.warn("Warning: enterRoom called without workerUrl; this may cause issues in some environments. You should pass workerUrl explicitly. Use:", "https://cdn.jsdelivr.net/npm/@dobuki/hello-worker/dist/signal-room.worker.min.js"), n({ userId: Y, appId: Z, room: x, host: E, autoRejoin: N, onOpen: q, onClose: C, onError: K, onPeerJoined: _, onPeerLeft: Q, onMessage: S });
  let $ = new Worker(V, { type: "module" }), J = false;
  function A({ userId: H, peerId: c }) {
    return { userId: H, peerId: c, receive: (T, B) => {
      if (J)
        return false;
      return $.postMessage({ cmd: "send", toPeerId: c, type: T, payload: B }), true;
    } };
  }
  let O = (H) => {
    let c = H.data;
    if (c.kind === "open")
      q?.();
    else if (c.kind === "close")
      $.terminate(), C?.(c.ev);
    else if (c.kind === "error")
      K?.();
    else if (c.kind === "peer-joined")
      _(c.users.map((T) => A({ userId: T.userId, peerId: T.peerId })));
    else if (c.kind === "peer-left")
      Q(c.users);
    else if (c.kind === "message")
      S(c.type, c.payload, A({ userId: c.fromUserId, peerId: c.fromPeerId }));
    else if (c.kind === "log")
      F?.(c.direction, c.obj);
  };
  return $.addEventListener("message", O), $.postMessage({ cmd: "enter", userId: Y, appId: Z, room: x, host: E, autoRejoin: N }), { exitRoom: () => {
    J = true, $.removeEventListener("message", O), $.postMessage({ cmd: "exit" });
  } };
}
var j = R;
function L({ appId: Y, receivePeerConnection: Z, peerlessUserExpiration: x, rtcConfig: E = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] }, enterRoomFunction: N = j, logLine: q = console.debug, onLeaveUser: C, workerUrl: K, onRoomReady: _, onRoomClose: Q }) {
  let S = `user-${crypto.randomUUID()}`, F = new Map;
  function V(c) {
    let T = F.get(c.userId), B = false;
    if (!T) {
      let b = { userId: c.userId, pc: new RTCPeerConnection(E), pendingRemoteIce: [], peers: new Map };
      b.peers.set(c.peerId, c), F.set(c.userId, b), b.pc.onicecandidate = (W) => {
        if (!W.candidate)
          return;
        for (let f of b.peers.values())
          if (f.receive("ice", W.candidate.toJSON()))
            break;
      }, b.pc.onconnectionstatechange = () => {
        q("\uD83D\uDCAC", { event: "pc-state", userId: b.userId, state: b.pc.connectionState });
      }, T = b, F.set(T.userId, T), B = true;
    } else if (T)
      clearTimeout(T.expirationTimeout), T.expirationTimeout = 0, T.peers.set(c.peerId, c);
    return [T, B];
  }
  function $(c) {
    C?.(c);
    let T = F.get(c);
    if (!T)
      return;
    try {
      T.pc.close();
    } catch {}
    F.delete(c);
  }
  async function J(c) {
    if (!c.pc.remoteDescription)
      return;
    let T = c.pendingRemoteIce;
    c.pendingRemoteIce = [];
    for (let B of T)
      try {
        await c.pc.addIceCandidate(B);
      } catch (b) {
        q("⚠️ ERROR", { error: "add-ice-failed", userId: c.userId, detail: String(b) });
      }
  }
  let A = new Map;
  function O({ room: c, host: T }) {
    let B = `${T}/room/${c}`, b = A.get(B);
    if (b)
      b.exitRoom(), A.delete(B);
  }
  function H({ room: c, host: T }) {
    return new Promise((B, b) => {
      async function W(D) {
        let [z] = V(D), G = z.pc, X = await G.createOffer();
        await G.setLocalDescription(X), D.receive("offer", G.localDescription?.toJSON());
      }
      let { exitRoom: f } = N({ userId: S, appId: Y, room: c, host: T, logLine: q, workerUrl: K, autoRejoin: true, onOpen() {
        _?.({ room: c, host: T }), B();
      }, onError() {
        console.error("onError"), b();
      }, onClose(D) {
        Q?.({ room: c, host: T, ev: D });
      }, onPeerJoined(D) {
        D.forEach((z) => {
          let [G, X] = V(z);
          if (!X)
            return;
          let M = G.pc;
          Z({ pc: M, userId: z.userId, initiator: true }), W(z);
        });
      }, onPeerLeft(D) {
        D.forEach(({ userId: z, peerId: G }) => {
          let X = F.get(z);
          if (!X)
            return;
          if (X.peers.delete(G), !X.peers.size)
            X.expirationTimeout = setTimeout(() => $(z), x ?? 0);
        });
      }, async onMessage(D, z, G) {
        let [X] = V(G), M = X.pc;
        if (D === "offer") {
          Z({ pc: M, userId: G.userId, initiator: false }), await M.setRemoteDescription(z);
          let h = await M.createAnswer();
          await M.setLocalDescription(h), G.receive("answer", M.localDescription?.toJSON()), await J(X);
          return;
        }
        if (D === "answer") {
          await M.setRemoteDescription(z), await J(X);
          return;
        }
        if (D === "ice") {
          let h = z;
          if (!M.remoteDescription) {
            X.pendingRemoteIce.push(h);
            return;
          }
          try {
            await M.addIceCandidate(h);
          } catch (g) {
            q("⚠️ ERROR", { error: "add-ice-failed", userId: X.userId, detail: String(g) });
          }
          return;
        }
      } });
      A.set(`${T}/room/${c}`, { exitRoom: f, room: c, host: T });
    });
  }
  return { userId: S, enterRoom: H, exitRoom: O, leaveUser: $, end() {
    A.forEach(({ exitRoom: c }) => c()), A.clear(), F.forEach(({ userId: c }) => $(c)), F.clear();
  } };
}
function U({ appId: Y, logLine: Z = console.debug, enterRoomFunction: x = R, peerlessUserExpiration: E, workerUrl: N, onRoomReady: q, onRoomClose: C }) {
  let K = [], _ = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] }, Q = new Set;
  function S(f, D) {
    D.onopen = () => {
      Z("\uD83D\uDCAC", { event: "dc-open", userId: f }), K.push(f), V.forEach((z) => z(f, "join", K));
    }, D.onmessage = ({ data: z }) => {
      Q.forEach((G) => G(z, f)), Z("\uD83D\uDCAC", { event: "dc-message", userId: f, data: z });
    }, D.onclose = () => {
      Z("\uD83D\uDCAC", { event: "dc-close", userId: f }), K.splice(K.indexOf(f), 1), V.forEach((z) => z(f, "leave", K));
    }, D.onerror = () => Z("⚠️ ERROR", { error: "dc-error", userId: f });
  }
  let F = new Map, V = new Set, { userId: $, enterRoom: J, exitRoom: A, leaveUser: O, end: H } = L({ appId: Y, rtcConfig: _, enterRoomFunction: x, logLine: Z, workerUrl: N, peerlessUserExpiration: E, onRoomReady: q, onRoomClose: C, onLeaveUser(f) {
    let D = F.get(f);
    try {
      D?.close();
    } catch {}
    F.delete(f);
  }, receivePeerConnection({ pc: f, userId: D, initiator: z }) {
    if (z) {
      let G = f.createDataChannel("data");
      S(D, G), F.set(D, G);
    } else
      f.ondatachannel = (G) => {
        let X = G.channel;
        S(D, X), F.set(D, X), f.ondatachannel = null;
      };
  } });
  function c(f, D) {
    F.forEach((z, G) => {
      if (D && G !== D)
        return;
      if (z.readyState === "open")
        z.send(f);
    });
  }
  function T(f) {
    Q.delete(f);
  }
  function B(f) {
    return Q.add(f), () => {
      T(f);
    };
  }
  function b(f) {
    V.delete(f);
  }
  function W(f) {
    return V.add(f), () => {
      b(f);
    };
  }
  return { userId: $, send: c, enterRoom: J, exitRoom: A, leaveUser: O, getUsers: () => K, addMessageListener: B, removeMessageListener: T, addUserListener: W, removeUserListener: b, end() {
    F.forEach((f) => {
      try {
        f.close();
      } catch {}
    }), F.clear(), H(), V.clear(), K.length = 0;
  } };
}

// node_modules/unique-names-generator/dist/index.m.js
var a = (a2) => {
  a2 = 1831565813 + (a2 |= 0) | 0;
  let e = Math.imul(a2 ^ a2 >>> 15, 1 | a2);
  return e = e + Math.imul(e ^ e >>> 7, 61 | e) ^ e, ((e ^ e >>> 14) >>> 0) / 4294967296;
};

class e {
  constructor(a2) {
    this.dictionaries = undefined, this.length = undefined, this.separator = undefined, this.style = undefined, this.seed = undefined;
    const { length: e2, separator: i, dictionaries: n2, style: l, seed: r } = a2;
    this.dictionaries = n2, this.separator = i, this.length = e2, this.style = l, this.seed = r;
  }
  generate() {
    if (!this.dictionaries)
      throw new Error('Cannot find any dictionary. Please provide at least one, or leave the "dictionary" field empty in the config object');
    if (this.length <= 0)
      throw new Error("Invalid length provided");
    if (this.length > this.dictionaries.length)
      throw new Error(`The length cannot be bigger than the number of dictionaries.
Length provided: ${this.length}. Number of dictionaries provided: ${this.dictionaries.length}`);
    let e2 = this.seed;
    return this.dictionaries.slice(0, this.length).reduce((i, n2) => {
      let l;
      e2 ? (l = ((e3) => {
        if (typeof e3 == "string") {
          const i2 = e3.split("").map((a2) => a2.charCodeAt(0)).reduce((a2, e4) => a2 + e4, 1), n3 = Math.floor(Number(i2));
          return a(n3);
        }
        return a(e3);
      })(e2), e2 = 4294967296 * l) : l = Math.random();
      let r = n2[Math.floor(l * n2.length)] || "";
      if (this.style === "lowerCase")
        r = r.toLowerCase();
      else if (this.style === "capital") {
        const [a2, ...e3] = r.split("");
        r = a2.toUpperCase() + e3.join("");
      } else
        this.style === "upperCase" && (r = r.toUpperCase());
      return i ? `${i}${this.separator}${r}` : `${r}`;
    }, "");
  }
}
var i = { separator: "_", dictionaries: [] };
var n2 = (a2) => {
  const n3 = [...a2 && a2.dictionaries || i.dictionaries], l = { ...i, ...a2, length: a2 && a2.length || n3.length, dictionaries: n3 };
  if (!a2 || !a2.dictionaries || !a2.dictionaries.length)
    throw new Error('A "dictionaries" array must be provided. This is a breaking change introduced starting from Unique Name Generator v4. Read more about the breaking change here: https://github.com/andreasonny83/unique-names-generator#migration-guide');
  return new e(l).generate();
};
var l = ["able", "above", "absent", "absolute", "abstract", "abundant", "academic", "acceptable", "accepted", "accessible", "accurate", "accused", "active", "actual", "acute", "added", "additional", "adequate", "adjacent", "administrative", "adorable", "advanced", "adverse", "advisory", "aesthetic", "afraid", "aggregate", "aggressive", "agreeable", "agreed", "agricultural", "alert", "alive", "alleged", "allied", "alone", "alright", "alternative", "amateur", "amazing", "ambitious", "amused", "ancient", "angry", "annoyed", "annual", "anonymous", "anxious", "appalling", "apparent", "applicable", "appropriate", "arbitrary", "architectural", "armed", "arrogant", "artificial", "artistic", "ashamed", "asleep", "assistant", "associated", "atomic", "attractive", "automatic", "autonomous", "available", "average", "awake", "aware", "awful", "awkward", "back", "bad", "balanced", "bare", "basic", "beautiful", "beneficial", "better", "bewildered", "big", "binding", "biological", "bitter", "bizarre", "blank", "blind", "blonde", "bloody", "blushing", "boiling", "bold", "bored", "boring", "bottom", "brainy", "brave", "breakable", "breezy", "brief", "bright", "brilliant", "broad", "broken", "bumpy", "burning", "busy", "calm", "capable", "capitalist", "careful", "casual", "causal", "cautious", "central", "certain", "changing", "characteristic", "charming", "cheap", "cheerful", "chemical", "chief", "chilly", "chosen", "christian", "chronic", "chubby", "circular", "civic", "civil", "civilian", "classic", "classical", "clean", "clear", "clever", "clinical", "close", "closed", "cloudy", "clumsy", "coastal", "cognitive", "coherent", "cold", "collective", "colonial", "colorful", "colossal", "coloured", "colourful", "combative", "combined", "comfortable", "coming", "commercial", "common", "communist", "compact", "comparable", "comparative", "compatible", "competent", "competitive", "complete", "complex", "complicated", "comprehensive", "compulsory", "conceptual", "concerned", "concrete", "condemned", "confident", "confidential", "confused", "conscious", "conservation", "conservative", "considerable", "consistent", "constant", "constitutional", "contemporary", "content", "continental", "continued", "continuing", "continuous", "controlled", "controversial", "convenient", "conventional", "convinced", "convincing", "cooing", "cool", "cooperative", "corporate", "correct", "corresponding", "costly", "courageous", "crazy", "creative", "creepy", "criminal", "critical", "crooked", "crowded", "crucial", "crude", "cruel", "cuddly", "cultural", "curious", "curly", "current", "curved", "cute", "daily", "damaged", "damp", "dangerous", "dark", "dead", "deaf", "deafening", "dear", "decent", "decisive", "deep", "defeated", "defensive", "defiant", "definite", "deliberate", "delicate", "delicious", "delighted", "delightful", "democratic", "dependent", "depressed", "desirable", "desperate", "detailed", "determined", "developed", "developing", "devoted", "different", "difficult", "digital", "diplomatic", "direct", "dirty", "disabled", "disappointed", "disastrous", "disciplinary", "disgusted", "distant", "distinct", "distinctive", "distinguished", "disturbed", "disturbing", "diverse", "divine", "dizzy", "domestic", "dominant", "double", "doubtful", "drab", "dramatic", "dreadful", "driving", "drunk", "dry", "dual", "due", "dull", "dusty", "dutch", "dying", "dynamic", "eager", "early", "eastern", "easy", "economic", "educational", "eerie", "effective", "efficient", "elaborate", "elated", "elderly", "eldest", "electoral", "electric", "electrical", "electronic", "elegant", "eligible", "embarrassed", "embarrassing", "emotional", "empirical", "empty", "enchanting", "encouraging", "endless", "energetic", "enormous", "enthusiastic", "entire", "entitled", "envious", "environmental", "equal", "equivalent", "essential", "established", "estimated", "ethical", "ethnic", "eventual", "everyday", "evident", "evil", "evolutionary", "exact", "excellent", "exceptional", "excess", "excessive", "excited", "exciting", "exclusive", "existing", "exotic", "expected", "expensive", "experienced", "experimental", "explicit", "extended", "extensive", "external", "extra", "extraordinary", "extreme", "exuberant", "faint", "fair", "faithful", "familiar", "famous", "fancy", "fantastic", "far", "fascinating", "fashionable", "fast", "fat", "fatal", "favourable", "favourite", "federal", "fellow", "female", "feminist", "few", "fierce", "filthy", "final", "financial", "fine", "firm", "fiscal", "fit", "fixed", "flaky", "flat", "flexible", "fluffy", "fluttering", "flying", "following", "fond", "foolish", "foreign", "formal", "formidable", "forthcoming", "fortunate", "forward", "fragile", "frail", "frantic", "free", "frequent", "fresh", "friendly", "frightened", "front", "frozen", "full", "fun", "functional", "fundamental", "funny", "furious", "future", "fuzzy", "gastric", "gay", "general", "generous", "genetic", "gentle", "genuine", "geographical", "giant", "gigantic", "given", "glad", "glamorous", "gleaming", "global", "glorious", "golden", "good", "gorgeous", "gothic", "governing", "graceful", "gradual", "grand", "grateful", "greasy", "great", "grieving", "grim", "gross", "grotesque", "growing", "grubby", "grumpy", "guilty", "handicapped", "handsome", "happy", "hard", "harsh", "head", "healthy", "heavy", "helpful", "helpless", "hidden", "high", "hilarious", "hissing", "historic", "historical", "hollow", "holy", "homeless", "homely", "hon", "honest", "horizontal", "horrible", "hostile", "hot", "huge", "human", "hungry", "hurt", "hushed", "husky", "icy", "ideal", "identical", "ideological", "ill", "illegal", "imaginative", "immediate", "immense", "imperial", "implicit", "important", "impossible", "impressed", "impressive", "improved", "inadequate", "inappropriate", "inc", "inclined", "increased", "increasing", "incredible", "independent", "indirect", "individual", "industrial", "inevitable", "influential", "informal", "inherent", "initial", "injured", "inland", "inner", "innocent", "innovative", "inquisitive", "instant", "institutional", "insufficient", "intact", "integral", "integrated", "intellectual", "intelligent", "intense", "intensive", "interested", "interesting", "interim", "interior", "intermediate", "internal", "international", "intimate", "invisible", "involved", "irrelevant", "isolated", "itchy", "jealous", "jittery", "joint", "jolly", "joyous", "judicial", "juicy", "junior", "just", "keen", "key", "kind", "known", "labour", "large", "late", "latin", "lazy", "leading", "left", "legal", "legislative", "legitimate", "lengthy", "lesser", "level", "lexical", "liable", "liberal", "light", "like", "likely", "limited", "linear", "linguistic", "liquid", "literary", "little", "live", "lively", "living", "local", "logical", "lonely", "long", "loose", "lost", "loud", "lovely", "low", "loyal", "ltd", "lucky", "mad", "magic", "magnetic", "magnificent", "main", "major", "male", "mammoth", "managerial", "managing", "manual", "many", "marginal", "marine", "marked", "married", "marvellous", "marxist", "mass", "massive", "mathematical", "mature", "maximum", "mean", "meaningful", "mechanical", "medical", "medieval", "melodic", "melted", "mental", "mere", "metropolitan", "mid", "middle", "mighty", "mild", "military", "miniature", "minimal", "minimum", "ministerial", "minor", "miserable", "misleading", "missing", "misty", "mixed", "moaning", "mobile", "moderate", "modern", "modest", "molecular", "monetary", "monthly", "moral", "motionless", "muddy", "multiple", "mushy", "musical", "mute", "mutual", "mysterious", "naked", "narrow", "nasty", "national", "native", "natural", "naughty", "naval", "near", "nearby", "neat", "necessary", "negative", "neighbouring", "nervous", "net", "neutral", "new", "nice", "noble", "noisy", "normal", "northern", "nosy", "notable", "novel", "nuclear", "numerous", "nursing", "nutritious", "nutty", "obedient", "objective", "obliged", "obnoxious", "obvious", "occasional", "occupational", "odd", "official", "ok", "okay", "old", "olympic", "only", "open", "operational", "opposite", "optimistic", "oral", "ordinary", "organic", "organisational", "original", "orthodox", "other", "outdoor", "outer", "outrageous", "outside", "outstanding", "overall", "overseas", "overwhelming", "painful", "pale", "panicky", "parallel", "parental", "parliamentary", "partial", "particular", "passing", "passive", "past", "patient", "payable", "peaceful", "peculiar", "perfect", "permanent", "persistent", "personal", "petite", "philosophical", "physical", "plain", "planned", "plastic", "pleasant", "pleased", "poised", "polite", "political", "poor", "popular", "positive", "possible", "potential", "powerful", "practical", "precious", "precise", "preferred", "pregnant", "preliminary", "premier", "prepared", "present", "presidential", "pretty", "previous", "prickly", "primary", "prime", "primitive", "principal", "printed", "prior", "private", "probable", "productive", "professional", "profitable", "profound", "progressive", "prominent", "promising", "proper", "proposed", "prospective", "protective", "protestant", "proud", "provincial", "psychiatric", "psychological", "public", "puny", "pure", "purring", "puzzled", "quaint", "qualified", "quarrelsome", "querulous", "quick", "quickest", "quiet", "quintessential", "quixotic", "racial", "radical", "rainy", "random", "rapid", "rare", "raspy", "rational", "ratty", "raw", "ready", "real", "realistic", "rear", "reasonable", "recent", "reduced", "redundant", "regional", "registered", "regular", "regulatory", "related", "relative", "relaxed", "relevant", "reliable", "relieved", "religious", "reluctant", "remaining", "remarkable", "remote", "renewed", "representative", "repulsive", "required", "resident", "residential", "resonant", "respectable", "respective", "responsible", "resulting", "retail", "retired", "revolutionary", "rich", "ridiculous", "right", "rigid", "ripe", "rising", "rival", "roasted", "robust", "rolling", "romantic", "rotten", "rough", "round", "royal", "rubber", "rude", "ruling", "running", "rural", "sacred", "sad", "safe", "salty", "satisfactory", "satisfied", "scared", "scary", "scattered", "scientific", "scornful", "scrawny", "screeching", "secondary", "secret", "secure", "select", "selected", "selective", "selfish", "semantic", "senior", "sensible", "sensitive", "separate", "serious", "severe", "sexual", "shaggy", "shaky", "shallow", "shared", "sharp", "sheer", "shiny", "shivering", "shocked", "short", "shrill", "shy", "sick", "significant", "silent", "silky", "silly", "similar", "simple", "single", "skilled", "skinny", "sleepy", "slight", "slim", "slimy", "slippery", "slow", "small", "smart", "smiling", "smoggy", "smooth", "social", "socialist", "soft", "solar", "sole", "solid", "sophisticated", "sore", "sorry", "sound", "sour", "southern", "soviet", "spare", "sparkling", "spatial", "special", "specific", "specified", "spectacular", "spicy", "spiritual", "splendid", "spontaneous", "sporting", "spotless", "spotty", "square", "squealing", "stable", "stale", "standard", "static", "statistical", "statutory", "steady", "steep", "sticky", "stiff", "still", "stingy", "stormy", "straight", "straightforward", "strange", "strategic", "strict", "striking", "striped", "strong", "structural", "stuck", "stupid", "subjective", "subsequent", "substantial", "subtle", "successful", "successive", "sudden", "sufficient", "suitable", "sunny", "super", "superb", "superior", "supporting", "supposed", "supreme", "sure", "surprised", "surprising", "surrounding", "surviving", "suspicious", "sweet", "swift", "symbolic", "sympathetic", "systematic", "tall", "tame", "tart", "tasteless", "tasty", "technical", "technological", "teenage", "temporary", "tender", "tense", "terrible", "territorial", "testy", "then", "theoretical", "thick", "thin", "thirsty", "thorough", "thoughtful", "thoughtless", "thundering", "tight", "tiny", "tired", "top", "tory", "total", "tough", "toxic", "traditional", "tragic", "tremendous", "tricky", "tropical", "troubled", "typical", "ugliest", "ugly", "ultimate", "unable", "unacceptable", "unaware", "uncertain", "unchanged", "uncomfortable", "unconscious", "underground", "underlying", "unemployed", "uneven", "unexpected", "unfair", "unfortunate", "unhappy", "uniform", "uninterested", "unique", "united", "universal", "unknown", "unlikely", "unnecessary", "unpleasant", "unsightly", "unusual", "unwilling", "upper", "upset", "uptight", "urban", "urgent", "used", "useful", "useless", "usual", "vague", "valid", "valuable", "variable", "varied", "various", "varying", "vast", "verbal", "vertical", "very", "vicarious", "vicious", "victorious", "violent", "visible", "visiting", "visual", "vital", "vitreous", "vivacious", "vivid", "vocal", "vocational", "voiceless", "voluminous", "voluntary", "vulnerable", "wandering", "warm", "wasteful", "watery", "weak", "wealthy", "weary", "wee", "weekly", "weird", "welcome", "well", "western", "wet", "whispering", "whole", "wicked", "wide", "widespread", "wild", "wilful", "willing", "willowy", "wily", "wise", "wispy", "wittering", "witty", "wonderful", "wooden", "working", "worldwide", "worried", "worrying", "worthwhile", "worthy", "written", "wrong", "xenacious", "xenial", "xenogeneic", "xenophobic", "xeric", "xerothermic", "yabbering", "yammering", "yappiest", "yappy", "yawning", "yearling", "yearning", "yeasty", "yelling", "yelping", "yielding", "yodelling", "young", "youngest", "youthful", "ytterbic", "yucky", "yummy", "zany", "zealous", "zeroth", "zestful", "zesty", "zippy", "zonal", "zoophagous", "zygomorphic", "zygotic"];
var r = ["aardvark", "aardwolf", "albatross", "alligator", "alpaca", "amphibian", "anaconda", "angelfish", "anglerfish", "ant", "anteater", "antelope", "antlion", "ape", "aphid", "armadillo", "asp", "baboon", "badger", "bandicoot", "barnacle", "barracuda", "basilisk", "bass", "bat", "bear", "beaver", "bedbug", "bee", "beetle", "bird", "bison", "blackbird", "boa", "boar", "bobcat", "bobolink", "bonobo", "booby", "bovid", "bug", "butterfly", "buzzard", "camel", "canid", "canidae", "capybara", "cardinal", "caribou", "carp", "cat", "caterpillar", "catfish", "catshark", "cattle", "centipede", "cephalopod", "chameleon", "cheetah", "chickadee", "chicken", "chimpanzee", "chinchilla", "chipmunk", "cicada", "clam", "clownfish", "cobra", "cockroach", "cod", "condor", "constrictor", "coral", "cougar", "cow", "coyote", "crab", "crane", "crawdad", "crayfish", "cricket", "crocodile", "crow", "cuckoo", "damselfly", "deer", "dingo", "dinosaur", "dog", "dolphin", "donkey", "dormouse", "dove", "dragon", "dragonfly", "duck", "eagle", "earthworm", "earwig", "echidna", "eel", "egret", "elephant", "elk", "emu", "ermine", "falcon", "felidae", "ferret", "finch", "firefly", "fish", "flamingo", "flea", "fly", "flyingfish", "fowl", "fox", "frog", "galliform", "gamefowl", "gayal", "gazelle", "gecko", "gerbil", "gibbon", "giraffe", "goat", "goldfish", "goose", "gopher", "gorilla", "grasshopper", "grouse", "guan", "guanaco", "guineafowl", "gull", "guppy", "haddock", "halibut", "hamster", "hare", "harrier", "hawk", "hedgehog", "heron", "herring", "hippopotamus", "hookworm", "hornet", "horse", "hoverfly", "hummingbird", "hyena", "iguana", "impala", "jackal", "jaguar", "jay", "jellyfish", "junglefowl", "kangaroo", "kingfisher", "kite", "kiwi", "koala", "koi", "krill", "ladybug", "lamprey", "landfowl", "lark", "leech", "lemming", "lemur", "leopard", "leopon", "limpet", "lion", "lizard", "llama", "lobster", "locust", "loon", "louse", "lungfish", "lynx", "macaw", "mackerel", "magpie", "mammal", "manatee", "mandrill", "marlin", "marmoset", "marmot", "marsupial", "marten", "mastodon", "meadowlark", "meerkat", "mink", "minnow", "mite", "mockingbird", "mole", "mollusk", "mongoose", "monkey", "moose", "mosquito", "moth", "mouse", "mule", "muskox", "narwhal", "newt", "nightingale", "ocelot", "octopus", "opossum", "orangutan", "orca", "ostrich", "otter", "owl", "ox", "panda", "panther", "parakeet", "parrot", "parrotfish", "partridge", "peacock", "peafowl", "pelican", "penguin", "perch", "pheasant", "pig", "pigeon", "pike", "pinniped", "piranha", "planarian", "platypus", "pony", "porcupine", "porpoise", "possum", "prawn", "primate", "ptarmigan", "puffin", "puma", "python", "quail", "quelea", "quokka", "rabbit", "raccoon", "rat", "rattlesnake", "raven", "reindeer", "reptile", "rhinoceros", "roadrunner", "rodent", "rook", "rooster", "roundworm", "sailfish", "salamander", "salmon", "sawfish", "scallop", "scorpion", "seahorse", "shark", "sheep", "shrew", "shrimp", "silkworm", "silverfish", "skink", "skunk", "sloth", "slug", "smelt", "snail", "snake", "snipe", "sole", "sparrow", "spider", "spoonbill", "squid", "squirrel", "starfish", "stingray", "stoat", "stork", "sturgeon", "swallow", "swan", "swift", "swordfish", "swordtail", "tahr", "takin", "tapir", "tarantula", "tarsier", "termite", "tern", "thrush", "tick", "tiger", "tiglon", "toad", "tortoise", "toucan", "trout", "tuna", "turkey", "turtle", "tyrannosaurus", "unicorn", "urial", "vicuna", "viper", "vole", "vulture", "wallaby", "walrus", "warbler", "wasp", "weasel", "whale", "whippet", "whitefish", "wildcat", "wildebeest", "wildfowl", "wolf", "wolverine", "wombat", "woodpecker", "worm", "wren", "xerinae", "yak", "zebra"];
var t = ["amaranth", "amber", "amethyst", "apricot", "aqua", "aquamarine", "azure", "beige", "black", "blue", "blush", "bronze", "brown", "chocolate", "coffee", "copper", "coral", "crimson", "cyan", "emerald", "fuchsia", "gold", "gray", "green", "harlequin", "indigo", "ivory", "jade", "lavender", "lime", "magenta", "maroon", "moccasin", "olive", "orange", "peach", "pink", "plum", "purple", "red", "rose", "salmon", "sapphire", "scarlet", "silver", "tan", "teal", "tomato", "turquoise", "violet", "white", "yellow"];

// src/index.ts
var { generateEmojis } = require_generate_random_emoji();
var root = {};
var { userId, send, enterRoom, addMessageListener, addUserListener, end } = U({
  appId: "napl-test",
  workerUrl: new URL("./signal-room.worker.js", import.meta.url)
});
var userList = [];
var program = new Program({
  userId,
  root,
  onDataCycle: refreshData
});
program.connectComm({
  onMessage: addMessageListener,
  onNewClient: (listener) => {
    addUserListener((user, action, users) => {
      if (action === "join") {
        listener(user);
      } else if (action === "leave") {
        program.setData(`users/${user}`, undefined);
      }
      userList = users;
      refreshData();
    });
  },
  send,
  close: end
});
enterRoom({ room: "napl-demo-room", host: "hello.dobuki.net" });
var emoji = generateEmojis(1)[0].image;
var randomName = n2({ dictionaries: [l, t, r] });
program.observe("abc").onChange((value) => console.log(value));
program.observe("users").onChange((users) => console.log("USERS", users));
program.setData("users/~{self}/name", randomName);
program.setData("users/~{self}/emoji", emoji);
program.onIncomingUpdatesReceived = () => refreshData();
addEventListener("mousemove", (e2) => {
  program.setData("cursor/pos", { x: e2.pageX, y: e2.pageY });
  program.setData("cursor/emoji", emoji);
});
program.observe(["cursor/pos", "cursor/emoji"]).onChange(([pos, emoji2]) => {
  const div = document.querySelector("#div-emoji");
  if (div) {
    console.log(pos, emoji2);
    div.style.left = `${pos.x + 10}px`;
    div.style.top = `${pos.y + 10}px`;
    div.textContent = emoji2;
  }
});
function refreshData() {
  const div = document.querySelector("#log-div") ?? document.body.appendChild(document.createElement("div"));
  div.id = "log-div";
  div.style.whiteSpace = "pre";
  div.style.fontFamily = "monospace";
  div.style.fontSize = "16px";
  div.textContent = JSON.stringify(root, null, 2) + `
Last update: ${new Date().toISOString()}
`;
  const divSplit = document.querySelector("#log-block") ?? document.body.appendChild(document.createElement("div"));
  divSplit.style.display = "flex";
  divSplit.style.flexDirection = "row";
  const divOut = document.querySelector("#log-div-out") ?? divSplit.appendChild(document.createElement("div"));
  divOut.id = "log-div-out";
  divOut.style.flex = "1";
  divOut.style.whiteSpace = "pre";
  divOut.style.fontFamily = "monospace";
  divOut.style.fontSize = "12px";
  divOut.textContent = program.outgoingUpdates.length ? `OUT
` + JSON.stringify(program.outgoingUpdates, null, 2) : "";
  const divIn = document.querySelector("#log-div-in") ?? divSplit.appendChild(document.createElement("div"));
  divIn.id = "log-div-in";
  divIn.style.flex = "1";
  divIn.style.whiteSpace = "pre";
  divIn.style.fontFamily = "monospace";
  divIn.style.fontSize = "12px";
  divIn.textContent = program.incomingUpdates.length ? `IN
` + JSON.stringify(program.incomingUpdates, null, 2) : "";
  const usrs = root.users;
  const allUsers = [userId, ...userList].map((userId2) => usrs?.[userId2]);
  const divUsers = document.querySelector("#log-div-users") ?? document.body.appendChild(document.createElement("div"));
  divUsers.id = "log-div-users";
  divUsers.style.flex = "1";
  divUsers.style.whiteSpace = "pre";
  divUsers.style.fontFamily = "monospace";
  divUsers.style.fontSize = "12px";
  divUsers.style.position = "absolute";
  divUsers.style.top = "5px";
  divUsers.style.right = "5px";
  divUsers.style.padding = "5px";
  divUsers.style.border = "1px solid black";
  divUsers.style.backgroundColor = "#ffffffaa";
  divUsers.textContent = `USERS
` + allUsers.map((user) => `${user?.emoji} ${user?.name}`).join(`
`);
  const divEmoji = document.querySelector("#div-emoji") ?? document.body.appendChild(document.createElement("div"));
  divEmoji.id = "div-emoji";
  divEmoji.style.position = "absolute";
}
function setupGamePlayer() {
  let paused = false;
  const updateButtons = new Set;
  function resetButtons() {
    updateButtons.forEach((callback) => callback());
  }
  function startLoop() {
    paused = false;
    let rafId = 0;
    function loop() {
      rafId = requestAnimationFrame(loop);
      program.performCycle();
    }
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      paused = true;
    };
  }
  {
    let stop;
    const button = document.body.appendChild(document.createElement("button"));
    button.textContent = "⏸️";
    button.addEventListener("mousedown", () => {
      if (paused) {
        stop = startLoop();
      } else {
        stop?.();
        stop = undefined;
      }
      resetButtons();
    });
    updateButtons.add(() => {
      button.textContent = paused ? "▶️" : "⏸️";
    });
    stop = startLoop();
  }
  {
    const button = document.body.appendChild(document.createElement("button"));
    button.textContent = "⏯️";
    button.addEventListener("mousedown", () => program.performCycle());
    updateButtons.add(() => {
      button.disabled = !paused;
    });
  }
  {
    const button = document.body.appendChild(document.createElement("button"));
    button.textContent = "\uD83D\uDD04";
    button.addEventListener("mousedown", () => {
      program.setData(`abc`, Math.random());
      refreshData();
    });
  }
  resetButtons();
}
setupGamePlayer();
export {
  root,
  program
};

//# debugId=4CADA635748A6EA064756E2164756E21
