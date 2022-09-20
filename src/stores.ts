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

export interface IAudioPlayer {
	audioElement?: HTMLAudioElement;
}

export interface ICard extends IAnswer, IMoveable, IAudioPlayer {
	id: string;
	element?: HTMLDivElement;
}

export const cards = writable<ICard[]>([]);

export interface IQuestion {
	correctAnswers: string[];
	numAttemptsTaken: number;
}

export interface IZone extends IAudioPlayer {
	zoneElement?: HTMLElement;
	questions: IQuestion[];
	currentQuestion?: IQuestion;
	correctlyAnsweredQuestions: IQuestion[];
}

// export const currentQuestion = writable<IQuestion>({ correctAnswers: [], numAttemptsTaken: 0 });
export const questionZone = writable<IZone>({ questions: [], correctlyAnsweredQuestions: [] });

export enum State {
	Intro,
	Asking,
	Review
}
export const state = writable<State>();
