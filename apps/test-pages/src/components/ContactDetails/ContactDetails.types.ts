export interface ContactDetailsType {
  categories: {
    conversations: [
      {
        id: number;
        title: string;
        profileUrl: string;
        channel: string;
        name: string;
        username?: string;
        status: number;
        tag?: string;
        date?: string;
        priority?: number;
        subject?: string;
        duration?: string;
      }
    ];
    tickets: [
      {
        id: number;
        title: string;
        profileUrl: string;
        channel: string;
        name: string;
        username?: string;
        status: number;
        tag?: string;
        date?: string;
        priority?: number;
        subject?: string;
        duration?: string;
      }
    ];
    notes: [];
  };
}
