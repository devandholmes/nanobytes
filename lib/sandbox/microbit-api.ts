// MakeCode micro:bit API types for better code completion
export interface MicrobitAPI {
  basic: {
    showIcon: (icon: string) => void;
    showString: (text: string) => void;
    showNumber: (num: number) => void;
    clearScreen: () => void;
    pause: (ms: number) => void;
    forever: (handler: () => void) => void;
  };
  input: {
    onButtonPressed: (button: string, handler: () => void) => void;
    temperature: () => number;
    lightLevel: () => number;
  };
  led: {
    plot: (x: number, y: number) => void;
    unplot: (x: number, y: number) => void;
    toggle: (x: number, y: number) => void;
  };
  music: {
    playTone: (frequency: number, duration: number) => void;
    rest: (duration: number) => void;
  };
}

export enum IconNames {
  Heart = 'Heart',
  SmallHeart = 'SmallHeart',
  Yes = 'Yes',
  No = 'No',
  Happy = 'Happy',
  Sad = 'Sad',
  Confused = 'Confused',
  Angry = 'Angry',
  Asleep = 'Asleep',
  Surprised = 'Surprised',
  Silly = 'Silly',
  Fabulous = 'Fabulous',
  Meh = 'Meh',
  TShirt = 'TShirt',
  Rollerskate = 'Rollerskate',
  Duck = 'Duck',
  House = 'House',
  Tortoise = 'Tortoise',
  Butterfly = 'Butterfly',
  StickFigure = 'StickFigure',
  Ghost = 'Ghost',
  Sword = 'Sword',
  Giraffe = 'Giraffe',
  Skull = 'Skull',
  Umbrella = 'Umbrella',
  Snake = 'Snake',
}