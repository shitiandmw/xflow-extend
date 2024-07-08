import { useGraphEvent, useGraphStore } from '@antv/xflow';
import { useKeyboard, useHistory, useClipboard, } from '@antv/xflow';
import { useCallback } from 'react';
import React, { forwardRef } from 'react';
import { setFlowDataByName } from './flow';
import { FLowMetaData } from './types';

const Keyboard = forwardRef((_, ref) => {
  const { copy, paste, cut } = useClipboard();
  const { undo, redo } = useHistory();
  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);
  const initData = useGraphStore((state) => state.initData);


  const updateEdge = useGraphStore((state) => state.updateEdge);
  const updateNode = useGraphStore((state) => state.updateNode);

  const removeNodes = useGraphStore((state) => state.removeNodes);
  const removeEdges = useGraphStore((state) => state.removeEdges);

  const selectNodeIds = useCallback(() => {
    const nodeSelected = nodes.filter((node) => node.selected);
    const nodeIds: string[] = nodeSelected.map((node) => node.id!);
    return nodeIds;
  }, [nodes]);

  const selectEdgeIds = useCallback(() => {
    const edgesSelect = edges.filter((edge) => edge.selected);
    const edgeIds: string[] = edgesSelect.map((edge) => edge.id!);
    return edgeIds;
  }, [edges]);

  const selectShapeIds = () => {
    return [...selectEdgeIds(), ...selectNodeIds()];
  };

  useKeyboard(['meta+c', 'ctrl+c'], () => {
    copy(selectShapeIds());
  });

  useKeyboard(['meta+v', 'ctrl+v'], () => {
    console.log('paste');
    paste({ offset: 48 });
  });

  useKeyboard(['meta+x', 'ctrl+x'], () => {
    cut(selectShapeIds());
  });

  useKeyboard(['backspace', 'delete'], () => {
    removeNodes(selectNodeIds());
    removeEdges(selectEdgeIds());
  });

  useKeyboard(['meta+z', 'ctrl+z'], () => {
    undo();
  });
  useKeyboard(['meta+shift+z', 'ctrl+shift+z'], () => {
    redo();
  });

  useKeyboard(['meta+a', 'ctrl+a'], (e) => {
    e.preventDefault();
    nodes.map((node) => updateNode(node.id!, {
      selected: true, data: {
        ...node.data,
        selected: true,
      }
    }));
    edges.map((edge) => updateEdge(edge.id, {
      selected: true, data: {
        ...edge.data,
        selected: true,
      }
    }));
  });

  useGraphEvent('edge:connected', ({ edge }) => {
    updateEdge(edge.id, {
      animated: false,
    });
  });

  // useGraphEvent('edge:selected', ({ edge }) => {
  //   updateEdge(edge.id, {
  //     animated: true,
  //   });
  // });

  // useGraphEvent('edge:unselected', ({ edge }) => {
  //   updateEdge(edge.id, {
  //     animated: false,
  //   });
  // });

  // 同时删除与节点相关的连接线
  useGraphEvent('node:removed', ({ node }) => {
    const edgesToRemove = edges.filter((edge: any) => {
      return edge.target.cell == node.id || edge.source.cell == node.id
    });
    removeEdges(edgesToRemove.map((edge) => edge.id));
  })

  React.useEffect(() => {
    setFlowDataByName("nodes", nodes);
  }, [nodes]);
  React.useEffect(() => {
    setFlowDataByName("edges", edges);
  }, [edges]);

  React.useImperativeHandle(ref, () => ({
    setFlowData: (data: FLowMetaData) => {
      initData({ nodes: data?.nodes || [], edges: data.edges || [] })
    },
  }), []);

  return null;
});

export { Keyboard };