export enum PieceType {
  King,
  Queen,
  Rook,
  Bishop,
  Knight,
  Pawn
}

export enum PieceColor {
  White,
  Black
}

export class Piece {
  type: PieceType;
  color: PieceColor;
  hasMoved: boolean;

  constructor(type: PieceType, color: PieceColor) {
    this.type = type;
    this.color = color;
    this.hasMoved = false;
  }

  // Add methods related to piece movement if needed
}
