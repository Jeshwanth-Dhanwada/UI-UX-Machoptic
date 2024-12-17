/* eslint-disable import/no-anonymous-default-export */

import React, { useCallback, useEffect, useState } from "react";
import DashboardLayout from "./layout/dashboard.js";

import {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MarkerType,
} from "reactflow";

import { initialNodes, initialEdges } from "./nodes-edges.js";
import "reactflow/dist/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeProvider from "./theme/index.js";

let directionOn = "";

let id = 1;
// let nodeId = 0;
const getId = () => {
  const newId = id;
  id += 1; // Increment by 1
  return `${newId}`;
};
const LayoutFlow = () => {
  const { fitView, addNodes } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSideBarExpanded, setIsExpanded] = React.useState(false);
  // const onConnect = useCallback((params) =>
  //       setEdges((edge) =>
  //       addEdge(params, edge, type:"smoothstep")),
  //       [setEdges]);

  // Add Node --------------------------------------

  const [consecutiveAddCounter, setConsecutiveAddCounter] = useState(0);
  const onAddNode = useCallback(() => {
    const selectedNode = nodes.find((node) => node.selected);

    if (!selectedNode) {
      setConsecutiveAddCounter((prevCount) => prevCount + 1);

      if (consecutiveAddCounter >= 1) {
        // Show an alert when adding nodes consecutively for the second time
        alert("Please select a node before adding a new one.");
      } else {
        const newNode = {
          id: getId(),
          position: { x: 0, y: 0 },
          data: {
            label: `Node ${id}`,
          },
          sourcePosition: "right",
          targetPosition: "left",
          style: {
            background: "white", // Set background color
            color: "black", // Set text color
            borderColor: "#000",
            borderStyle: "solid",
            borderWidth: "1px",
            fontSize: "14", // Set the font size
            fontStyle: "normal", // Set the font style
            width: "150",
            height: "45",
            justifycontent: "center" /* Horizontally center */,
            alignitems: "center" /* Vertically center */,
          },
        };
        const newEdge = {
          id: `${newNode.id}`,
          source: "left",
          target: "",
          type: "smoothstep",
          animated: false,
          label: "New Label",
          style: {
            strokeWidth: 1,
            stroke: "#000",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 25,
            height: 25,
            color: "#000",
            arrow: true,
          },
        };

        addNodes(newNode, newEdge, setEdges);
        console.log(newNode, "new node");
        console.log(nodes, "new node");
      }
    } else {
      setConsecutiveAddCounter(0);
      const xOffset = 200; // Initial x-offset
      const yOffset = 0; // Initial y-offset
      const offsetIncrement = 50; // Increase in offset for each new node

      const existingNodesAtPosition = (x, y) =>
        nodes.some((node) => node.position.x === x && node.position.y === y);

      const calculatePosition = (x, y, offset) => {
        while (existingNodesAtPosition(x, y)) {
          x += offset;
          y += offset;
        }
        return { x, y };
      };

      console.log("something", initialNodes);

      // If a node is selected, add the new node and create a connection
      const newX = selectedNode.position.x + xOffset;
      const newY = selectedNode.position.y + yOffset;

      const { x: finalX, y: finalY } = calculatePosition(
        newX,
        newY,
        offsetIncrement
      );
      if (directionOn === "TB") {
        const newNode = {
          id: getId(),
          position: { x: finalX, y: finalY },
          sourcePosition: "bottom",
          targetPosition: "top",
          data: {
            label: `Node ${id}`,
          },
          style: {
            background: "white", // Set background color
            color: "black", // Set text color
            borderColor: "#000",
            borderStyle: "solid",
            borderWidth: "1px",
            fontSize: "14", // Set the font size
            fontStyle: "normal", // Set the font style
            width: "150",
            height: "45",
            justifycontent: "center" /* Horizontally center */,
            alignitems: "center" /* Vertically center */,
          },
        };
        const newEdge = {
          id: `${newNode.id}-edge`,
          source: selectedNode.id,
          target: newNode.id,
          type: "smoothstep",
          animated: false,
          label: "New Label",
          style: {
            strokeWidth: 1,
            stroke: "#000",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 25,
            height: 25,
            color: "#000",
            arrow: true,
          },
        };
        addNodes(newNode);
        setEdges((prevEdges) => [...prevEdges, newEdge]);
      } else {
        const newNode = {
          id: getId(),
          position: { x: finalX, y: finalY },
          sourcePosition: "right",
          targetPosition: "left",
          data: {
            label: `Node ${id}`,
          },
          style: {
            background: "white", // Set background color
            color: "black", // Set text color
            borderColor: "#000",
            borderStyle: "solid",
            borderWidth: "1px",
            fontSize: "14", // Set the font size
            fontStyle: "normal", // Set the font style
            width: "150",
            height: "45",
          },
        };
        const newEdge = {
          id: `${newNode.id}-edge`,
          source: selectedNode.id,
          target: newNode.id,
          type: "smoothstep",
          animated: false,
          label: "New Label",
          style: {
            strokeWidth: 1,
            stroke: "#000",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 25,
            height: 25,
            color: "#000",
            arrow: true,
          },
        };
        addNodes(newNode);
        setEdges((prevEdges) => [...prevEdges, newEdge]);
      }
    }
  }, [addNodes, consecutiveAddCounter, nodes, setEdges]);

  // Delete Node -------------------------------

  const [activePage, setActivePage] = useState("");

  // const handleLinkClick = (pageName) => {
  //   setActivePage(pageName);
  //   console.log(pageName)
  // };

  useEffect(() => {
    const observerErrorHandler = (e) => {
      if (
        e.message ===
        "ResizeObserver loop completed with undelivered notifications."
      ) {
        e.stopImmediatePropagation();
      }
    };

    window.addEventListener("error", observerErrorHandler);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: sidebarCollapsed ? "100%" : "100%",
          transition: "width 0.1s",
          zIndex: 1,
        }}
      >
        <DashboardLayout />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ReactFlowProvider>
        <LayoutFlow />
      </ReactFlowProvider>
    </ThemeProvider>
  );
};

export default App;
