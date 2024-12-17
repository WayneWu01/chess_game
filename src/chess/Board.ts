// src/chess/Board.ts
import { Piece, PieceType, PieceColor } from './Piece';

export class Board {
  grid: (Piece | null)[][];

  constructor() {
    this.grid = this.initializeBoard();
  }

  initializeBoard(): (Piece | null)[][] {
    const grid: (Piece | null)[][] = Array.from({ length: 8 }, () => Array(8).fill(null));

    // Initialize Black Pieces
    grid[0][0] = new Piece(PieceType.Rook, PieceColor.Black);
    grid[0][1] = new Piece(PieceType.Knight, PieceColor.Black);
    grid[0][2] = new Piece(PieceType.Bishop, PieceColor.Black);
    grid[0][3] = new Piece(PieceType.Queen, PieceColor.Black);
    grid[0][4] = new Piece(PieceType.King, PieceColor.Black);
    grid[0][5] = new Piece(PieceType.Bishop, PieceColor.Black);
    grid[0][6] = new Piece(PieceType.Knight, PieceColor.Black);
    grid[0][7] = new Piece(PieceType.Rook, PieceColor.Black);
    for (let i = 0; i < 8; i++) {
      grid[1][i] = new Piece(PieceType.Pawn, PieceColor.Black);
    }

    // Initialize White Pieces
    grid[7][0] = new Piece(PieceType.Rook, PieceColor.White);
    grid[7][1] = new Piece(PieceType.Knight, PieceColor.White);
    grid[7][2] = new Piece(PieceType.Bishop, PieceColor.White);
    grid[7][3] = new Piece(PieceType.Queen, PieceColor.White);
    grid[7][4] = new Piece(PieceType.King, PieceColor.White);
    grid[7][5] = new Piece(PieceType.Bishop, PieceColor.White);
    grid[7][6] = new Piece(PieceType.Knight, PieceColor.White);
    grid[7][7] = new Piece(PieceType.Rook, PieceColor.White);
    for (let i = 0; i < 8; i++) {
      grid[6][i] = new Piece(PieceType.Pawn, PieceColor.White);
    }

    return grid;
  }

  getPiece(position: { x: number; y: number }): Piece | null {
    const { x, y } = position;
    if (x < 0 || x > 7 || y < 0 || y > 7) return null;
    return this.grid[x][y];
  }

  setPiece(position: { x: number; y: number }, piece: Piece | null): void {
    const { x, y } = position;
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
    this.grid[x][y] = piece;
  }

}
