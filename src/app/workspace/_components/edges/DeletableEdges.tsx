"use client";

import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, useReactFlow, type EdgeProps } from '@xyflow/react';
import { Button } from '~/components/ui/button';


export default function DeletableEdges(props: EdgeProps) {

    const [edgePath, labelX, labelY] = getSmoothStepPath(props)
    const { setEdges } = useReactFlow();

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={props.markerEnd} style={props.style}/> 
            <EdgeLabelRenderer>
                <div 
                    className=""
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        pointerEvents: 'all',
                    }}
                >
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        className='w-5 h-5 border cursor-pointer rounded-full text-xs leading-none hover:shadow-lg '
                        onClick= {() => {
                            setEdges((edges) => edges.filter((e) => e.id !== props.id));
                        }}
                    >x</Button>

                </div>
            
            </EdgeLabelRenderer>      
        </>
    )

}