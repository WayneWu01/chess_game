// src/index.ts
import { Game } from './chess/Game';
import { BoardRenderer } from './chess/Render';

const game = new Game();
const renderer = new BoardRenderer(game.board, 'chessboard', game);
