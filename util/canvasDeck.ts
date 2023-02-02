import { Canvas, Image } from "canvas"
import { UserI } from "../structures/Uno"
import path from 'path'

const WIDTH = 167;
const HEIGHT = 258;
const WINDOW_WIDTH = 8;

export default function canvasDeck(player: UserI) {
    const rows = Math.ceil(player.deck.length / WINDOW_WIDTH);
    const columns = Math.min(WINDOW_WIDTH, player.deck.length);
    const canvas = new Canvas(WIDTH * columns, HEIGHT * rows, 'image');
    const ctx = canvas.getContext('2d');

    player.deck.forEach((i, index) => {
        const image = new Image();
        image.onload = () => {
            ctx.drawImage(
                image,
                (index % WINDOW_WIDTH) * WIDTH,
                Math.floor(index / WINDOW_WIDTH) * HEIGHT,
                WIDTH,
                HEIGHT
            );
        };
        image.src = path.resolve(process.cwd(), 'media', 'uno', `${i}.png`);
    });
    return canvas.toBuffer('image/jpeg');
}