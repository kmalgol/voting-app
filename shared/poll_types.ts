export interface Participants {
	[participantID: string]: string;
}

export interface Poll {
	id: string;
	topic: string;
	votesPerVoter: number;
	participants: Participants;
	adminID: string;
	// nominations: Nominations;
	// rankongs: Rankings;
	// results: Results;
	hasStarted: boolean;
}