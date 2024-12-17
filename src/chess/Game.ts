// src/chess/Game.ts
import { Board } from './Board';
import { Piece, PieceColor, PieceType } from './Piece';

export class Game {
  board: Board;
  currentPlayer: PieceColor;
  moveHistory: Array<{ from: { x: number; y: number }; to: { x: number; y: number }; piece: Piece | null }> = [];

  constructor() {
    this.board = new Board();
    this.currentPlayer = PieceColor.White;
  }

  isValidMove(from: { x: number; y: number }, to: { x: number; y: number }): boolean {
    const piece = this.board.getPiece(from);
    if (!piece || piece.color !== this.currentPlayer) return false;

    switch (piece.type) {
      case PieceType.Pawn:
        return this.validatePawnMove(from, to, piece);
      case PieceType.Knight:
        return this.validateKnightMove(from, to, piece);
      case PieceType.Bishop:
        return this.validateBishopMove(from, to, piece);
      case PieceType.Rook:
        return this.validateRookMove(from, to, piece);
      case PieceType.Queen:
        return this.validateQueenMove(from, to, piece);
      case PieceType.King:
        return this.validateKingMove(from, to, piece);
      default:
        return false;
    }
  }

  validatePawnMove(from: { x: number; y: number }, to: { x: number; y: number }, piece: Piece): boolean {
    const direction = piece.color === PieceColor.White ? -1 : 1;
    const startRow = piece.color === PieceColor.White ? 6 : 1;

    if (from.y === to.y) {
      if (this.board.getPiece(to) !== null) return false;
      if (to.x - from.x === direction) return true;
      if (from.x === startRow && to.x - from.x === 2 * direction && this.board.getPiece({ x: from.x + direction, y: from.y }) === null) {
        return true;
      }
    }

    if (Math.abs(to.y - from.y) === 1 && to.x - from.x === direction) {
      const targetPiece = this.board.getPiece(to);
      if (targetPiece && targetPiece.color !== piece.color) return true;
    }

    return false;
  }

  validateKnightMove(from: { x: number; y: number }, to: { x: number; y: number }, piece: Piece): boolean {
    const dx = Math.abs(to.x - from.x);
    const dy = Math.abs(to.y - from.y);

    if (!((dx === 2 && dy === 1) || (dx === 1 && dy === 2))) {
      return false;
    }

    const targetPiece = this.board.getPiece(to);
    if (targetPiece && targetPiece.color === piece.color) {
      return false;
    }

    return true;
  }

  validateBishopMove(from: { x: number; y: number }, to: { x: number; y: number }, piece: Piece): boolean {
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    if (Math.abs(dx) !== Math.abs(dy)) {
      return false;
    }
    const stepX = dx > 0 ? 1 : -1;
    const stepY = dy > 0 ? 1 : -1;

    let currentX = from.x + stepX;
    let currentY = from.y + stepY;
    while (currentX !== to.x && currentY !== to.y) {
      if (this.board.getPiece({ x: currentX, y: currentY }) !== null) {
        return false; 
      }
      currentX += stepX;
      currentY += stepY;
    }

    const targetPiece = this.board.getPiece(to);
    if (targetPiece && targetPiece.color === piece.color) {
      return false;
    }

    return true;
  }

  validateRookMove(from: { x: number; y: number }, to: { x: number; y: number }, piece: Piece): boolean {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    if (dx !== 0 && dy !== 0) {
      return false;
    }

    const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
    const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1;

    let currentX = from.x + stepX;
    let currentY = from.y + stepY;
    while (currentX !== to.x || currentY !== to.y) {
      if (this.board.getPiece({ x: currentX, y: currentY }) !== null) {
        return false; 
      }
      currentX += stepX;
      currentY += stepY;
    }

    const targetPiece = this.board.getPiece(to);
    if (targetPiece && targetPiece.color === piece.color) {
      return false;
    }

    return true;
  }

  validateQueenMove(from: { x: number; y: number }, to: { x: number; y: number }, piece: Piece): boolean {
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    if (Math.abs(dx) !== Math.abs(dy) && dx !== 0 && dy !== 0) {
      return false;
    }

    const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
    const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1;

    let currentX = from.x + stepX;
    let currentY = from.y + stepY;
    while (currentX !== to.x || currentY !== to.y) {
      if (this.board.getPiece({ x: currentX, y: currentY }) !== null) {
        return false; 
      }
      currentX += stepX;
      currentY += stepY;
    }
    const targetPiece = this.board.getPiece(to);
    if (targetPiece && targetPiece.color === piece.color) {
      return false;
    }

    return true;
  }

  validateKingMove(from: { x: number; y: number }, to: { x: number; y: number }, piece: Piece): boolean {
    const dx = Math.abs(to.x - from.x);
    const dy = Math.abs(to.y - from.y);

    if (dx > 1 || dy > 1) {
      return false;
    }

    const targetPiece = this.board.getPiece(to);
    if (targetPiece && targetPiece.color === piece.color) {
      return false;
    }

    return true;
  }

  move(from: { x: number; y: number }, to: { x: number; y: number }): boolean {
    if (!this.isValidMove(from, to)) return false;

    const piece = this.board.getPiece(from);
    const target = this.board.getPiece(to);

    this.board.setPiece(to, piece);
    this.board.setPiece(from, null);

    if (piece) piece.hasMoved = true;
    this.moveHistory.push({ from, to, piece: target });
    this.currentPlayer = this.currentPlayer === PieceColor.White ? PieceColor.Black : PieceColor.White;

    return true;
  }

}
