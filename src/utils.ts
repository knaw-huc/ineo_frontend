// frontend/src/utils.ts
export async function fetchConceptName(url: string): Promise<string> {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/rdf+xml'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'application/xml');
        const label = xmlDoc.querySelector('skos\\:prefLabel')?.textContent;

        return label || 'Unknown';
    } catch (error) {
        console.error('Error fetching concept name:', error);
        return 'Unknown';
    }
}
