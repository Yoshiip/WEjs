const Osm = {
    parseRoads: (data) => {
        const nodes = data.elements.filter((n) => n.type == "node");

        const lats = nodes.map(n => n.lat);
        const lons = nodes.map(n => n.lon);

        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        
        const minLon = Math.min(...lons);
        const maxLon = Math.max(...lons);

        const deltaLat = maxLat - minLat;
        const deltaLon = maxLon - minLon;
        const ar = deltaLon / deltaLat;
        const height = deltaLat * 111000 * 10;
        
        const width = height * ar * Math.cos(degToRad(maxLat));

        const points = [];
        const segments = [];
        for (const node of nodes) {
            const y = invLerp(maxLat, minLat, node.lat) * height;
            const x = invLerp(minLon, maxLon, node.lon) * width;
            const point = new Point(x, y);
            point.id = node.id;
            points.push(point);
        }

        const ways = data.elements.filter(w => w.type == "way");
        for (const way of ways) {
            const ids = way.nodes;
            for (let i = 1; i < ids.length; i++) {
                const prev = points.find((p) => p.id == ids[i - 1]);
                const cur = points.find((p) => p.id == ids[i]);
                const oneWay = way.tags.oneway || way.tags.lanes == 1;
                segments.push(new Segment(prev, cur, oneWay));
            }
        }

        return { points, segments }
    },
}

async function osmRequest(lat, lon, size = 0.004) {
    var rect = new Rect(lat, lon, lat, lon);
    rect.expands(size);
    var bbox = rect.toString();
    var result = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
            method: "POST",
            body: "data="+ encodeURIComponent(`
                [bbox:` +  bbox + `]
                [out:json]
                [timeout:90]
                ;
                (
                    (
                        way['highway']
                        ['highway' !~'pedestrian']
                        ['highway' !~ 'footway']
                        ['highway' !~ 'cycleway']
                        ['highway' !~ 'path']
                        ['highway' !~ 'service']
                        ['highway' !~ 'corridor']
                        ['highway' !~ 'track']
                        ['highway' !~ 'steps']
                        ['highway' !~ 'raceway']
                        ['highway' !~ 'bridleway']
                        ['highway' !~ 'proposed']
                        ['highway' !~ 'construction']
                        ['highway' !~ 'elevator']
                        ['highway' !~ 'bus_guideway']
                        ['access' !~ 'private']
                        ['access' !~ 'no'];
                    );
                );
                out body;
                >;
                out skel;
            `)
        },
    ).then(
        (data)=>data.json()
    )
    
    console.log(JSON.stringify(result , null, 2))
    return JSON.stringify(result , null, 2);
}