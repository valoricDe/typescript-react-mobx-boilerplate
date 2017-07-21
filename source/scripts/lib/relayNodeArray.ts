
import INode = GQL.INode;
export default function relayNodeArray(edges): INode[] {
	return edges.map(function(edge) { return edge.node});
}