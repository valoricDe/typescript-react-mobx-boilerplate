export default function relayNodeArray(edges) {
	return edges.map(function(edge) { return edge.node});
}