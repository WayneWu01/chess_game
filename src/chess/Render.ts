// src/chess/BoardRenderer.ts
import { Board } from './Board';
import { Piece, PieceColor, PieceType } from './Piece';
import { Game } from './Game';

export class BoardRenderer {
  boardElement: HTMLElement;
  board: Board;
  game: Game;
  selectedSquare: HTMLElement | null = null;
  fromPosition: { x: number; y: number } | null = null;

  constructor(board: Board, boardElementId: string, game: Game) {
    this.board = board;
    this.game = game;
    const el = document.getElementById(boardElementId);
    if (!el) throw new Error('Board element not found');
    this.boardElement = el;
    this.render();
    this.addEventListeners();
  }

  pieceToUnicode(piece: Piece): string {
    const symbols: { [key: string]: string } = {
      'White_King': '♔',
      'White_Queen': '♕',
      'White_Rook': '♖',
      'White_Bishop': '♗',
      'White_Knight': '♘',
      'White_Pawn': '♙',
      'Black_King': '♚',
      'Black_Queen': '♛',
      'Black_Rook': '♜',
      'Black_Bishop': '♝',
      'Black_Knight': '♞',
      'Black_Pawn': '♟︎',
    };
    const key = `${PieceColor[piece.color]}_${PieceType[piece.type]}`;
    return symbols[key] || '';
  }

  render(): void {
    // Clear existing squares
    this.boardElement.innerHTML = '';

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const square = document.createElement('div');
        square.classList.add('square');
        // Determine square color
        if ((x + y) % 2 === 0) {
          square.classList.add('white');
        } else {
          square.classList.add('black');
        }

        const piece = this.board.getPiece({ x, y });
        if (piece) {
          square.textContent = this.pieceToUnicode(piece);
        }

        // Add data attributes for position
        square.dataset.x = x.toString();
        square.dataset.y = y.toString();

        this.boardElement.appendChild(square);
      }
    }
  }

  update(): void {
    this.render();
  }

  addEventListeners(): void {
    this.boardElement.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.classList.contains('square')) return;

      const x = parseInt(target.dataset.x!);
      const y = parseInt(target.dataset.y!);

      if (this.fromPosition) {
        // Attempt to move
        const success = this.game.move(this.fromPosition, { x, y });
        if (success) {
          this.update();
          this.fromPosition = null;
          if (this.selectedSquare) {
            this.selectedSquare.classList.remove('selected');
            this.selectedSquare = null;
          }
        } else {
          // Invalid move, deselect
          if (this.selectedSquare) {
            this.selectedSquare.classList.remove('selected');
          }
          this.fromPosition = null;
          this.selectedSquare = null;
        }
      } else {
        // Select a piece
        const piece = this.board.getPiece({ x, y });
        if (piece && piece.color === this.game.currentPlayer) {
          this.fromPosition = { x, y };
          this.selectedSquare = target;
          this.selectedSquare.classList.add('selected');
        }
      }
    });
  }
}
