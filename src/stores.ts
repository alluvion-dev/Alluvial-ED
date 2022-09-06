import { writable } from 'svelte/store';

export const score = writable(0);

export interface IAnswer {
	id: string;
	isSubmitted: boolean;
	isCorrect: boolean;
}

export interface IMoveable {
	isMoveable: boolean;
}

export interface ICard extends IAnswer, IMoveable {
	id: string;
	element?: HTMLDivElement;
	audioElement?: HTMLAudioElement;
}

export const cards = writable<ICard[]>([]);

export interface IQuestion {
	target?: HTMLElement;
	correctAnswers: string[];
}
export const currentQuestion = writable<IQuestion>({ correctAnswers: [] });
