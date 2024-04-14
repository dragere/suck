import { createEffect, children, JSX, Signal, onMount, ChildrenReturn, batch, untrack, on, Accessor } from "solid-js";
import { createSignal, For, Show } from 'solid-js';
import styles from "./App.module.css";
import { Component } from 'solid-js'

// type InfListProps<P = { current: number }, C = JSX.Element> = P & { children: C };

type ListDirection = 'horizontal' | 'vertical';

export default function InfList(props: { children: JSX.Element, current?: Signal<number>, dir?: ListDirection }) {
    const c = children(() => props.children);
    let [cs, setCs] = createSignal(c.toArray());

    createEffect(on(c, () => {
        batch(() => {
            setCurr(0);
            setCs(c.toArray());
        })
        setupScroll();
    }));

    let [curr, setCurr] = props.current || createSignal(0);

    let drawCs = () => {
        const len = cs().length;
        const center = cs().slice(Math.floor(len / 2), Math.floor(len / 2) + 1)!;
        const top = cs().slice(0, Math.floor(len / 2))!;
        const bottom = cs().slice(Math.floor(len / 2) + 1, len)!;
        return [top, center, bottom];
    }

    let touchStartPosY: number | null = null;
    let touchScrollCount: number = 0;
    const direction = props.dir || 'vertical';


    function setupScroll() {
        console.log('set scroll');
        scroll(Math.floor(cs().length / 2) - curr(), false);
    }

    function scroll(dir: number, updateCurrent = true) {
        
        for (let i = 0; i < Math.abs(dir); i++) { // naiv, can be done all at once
            if (dir > 0) {
                const el = cs().pop()!;
                setCs([el, ...cs()]);
                if (updateCurrent) setCurr(c => (c - 1 < 0) ? cs().length - 1 : c - 1)
            } else {
                const el = cs().splice(0, 1)!;
                setCs(cs().concat(el));
                if (updateCurrent) setCurr(c => (c + 1) % cs().length)
            }


        }
    }

    function handleScroll(e: WheelEvent) {
        scroll(Math.sign(-e.deltaY));
    }

    function handleTouchMove(e: any) {
        if (touchStartPosY === null) return;
        const delta = Math.round((e.touches[0].screenY - touchStartPosY) / 30);
        if (delta != touchScrollCount) {
            scroll(delta - touchScrollCount);
            touchScrollCount = delta;
        }
    }

    function handleTouchStart(e: any) {
        touchStartPosY = e.touches[0].screenY;
    }


    // onMount(async () => {
    //     scroll(Math.floor(cs().length / 2) - curr(), false)
    // });


    return <div onwheel={handleScroll}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={() => touchStartPosY = null}
        classList={{ [styles.infListContainer]: true, [styles.verticalList]: direction == 'vertical', [styles.horizontalList]: direction == 'horizontal' }}>


        <For each={cs()}>{(child, _) =>
            <>{child}</>
        }</For>
        <Show when={cs().length % 2 == 0}>
            <div style={{ "opacity": "0", height: "29px" }}>
            </div>
        </Show>

        {/* <div style={{ "position": "relative" }}>
            <For each={drawCs()[0]}>{(child, _) =>
                <>{child}</>
                // <div>{child}</div>
            }</For>
        </div>

        <div style={{ "position": "relative" }}>
            <For each={drawCs()[1]}>{(child, _) =>
                <>{child}</>
                // <div>{child}</div>
            }</For>
        </div>

        <div style={{ "position": "relative" }}>
            <For each={drawCs()[2]}>{(child, _) =>
                <>{child}</>
                // <div>{child}</div>
            }</For>
        </div> */}

    </div>
}
/*

grouping css:
background: linear-gradient(0deg, rgba(255, 0, 0, 1) 0%, rgba(255, 0, 0, 0.711922268907563) 1px, rgba(255, 0, 0, 0.5) 3px, rgba(255, 0, 0, 0.2) 10px, rgba(255, 0, 0, 0.2) calc(100% - 10px), rgba(255, 0, 0, 0.5) calc(100% - 3px), rgba(255, 0, 0, 0.7) calc(100% - 1px), rgba(255, 0, 0, 1) 100%);

*/