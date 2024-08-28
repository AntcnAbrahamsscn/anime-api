// export interface Character {
//     title: string;
//     director: string;
//     producer: string;
// 	id: number;
// }

export interface ApiData {
    title: string;
    director: string;
    producer: string;
	image: string;
	id: number;
	description: string;
	rt_score: number;
	release_date: number;


}

async function getPirates(): Promise<ApiData[]> {
    const response = await fetch(
        "https://ghibliapi.vercel.app/films/"
    );
    const jsonData = await response.json();

	console.log(jsonData);
	
    return jsonData;
}

export { getPirates };
