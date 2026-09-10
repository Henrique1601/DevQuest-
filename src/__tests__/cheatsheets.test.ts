import { describe, it, expect } from "vitest";
import { mockCheatCategories } from "@/lib/data/cheatsheets";

describe("Cheatsheets & DevDocs Dataset", () => {
  it("deve conter todas as categorias principais de métodos e estruturas", () => {
    const categoryIds = mockCheatCategories.map((c) => c.id);
    expect(categoryIds).toContain("stack-structures");
    expect(categoryIds).toContain("queue-structures");
    expect(categoryIds).toContain("js-arrays");
    expect(categoryIds).toContain("js-strings");
    expect(categoryIds).toContain("js-objects");
    expect(categoryIds).toContain("js-async");
    expect(categoryIds).toContain("sql-essentials");
    expect(categoryIds).toContain("css-flexbox-grid");
  });

  it("todos os métodos devem possuir sintaxe, descrição e exemplo de código válidos", () => {
    for (const cat of mockCheatCategories) {
      for (const item of cat.items) {
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.syntax.length).toBeGreaterThan(0);
        expect(item.description.length).toBeGreaterThan(0);
        expect(item.example.length).toBeGreaterThan(0);
      }
    }
  });

  it("deve conter métodos de Array fundamentais com complexidade e mutabilidade mapeadas", () => {
    const arrayCat = mockCheatCategories.find((c) => c.id === "js-arrays");
    expect(arrayCat).toBeDefined();

    const mapMethod = arrayCat?.items.find((i) => i.name.includes(".map"));
    expect(mapMethod).toBeDefined();
    expect(mapMethod?.mutates).toBe(false);
    expect(mapMethod?.complexity).toBe("O(n)");

    const spliceMethod = arrayCat?.items.find((i) => i.name.includes(".splice"));
    expect(spliceMethod).toBeDefined();
    expect(spliceMethod?.mutates).toBe(true);

    const sliceMethod = arrayCat?.items.find((i) => i.name.includes(".slice"));
    expect(sliceMethod).toBeDefined();
    expect(sliceMethod?.mutates).toBe(false);
  });

  it("deve implementar corretamente a lógica de Pilha (Stack LIFO)", () => {
    class Stack<T> {
      private items: T[] = [];
      push(el: T) { this.items.push(el); }
      pop(): T | undefined { return this.items.pop(); }
      peek(): T | undefined { return this.items[this.items.length - 1]; }
      isEmpty(): boolean { return this.items.length === 0; }
      size(): number { return this.items.length; }
    }

    const s = new Stack<string>();
    expect(s.isEmpty()).toBe(true);
    expect(s.size()).toBe(0);

    s.push("Prato 1");
    s.push("Prato 2");
    s.push("Prato 3");

    expect(s.size()).toBe(3);
    expect(s.peek()).toBe("Prato 3");

    const popped = s.pop();
    expect(popped).toBe("Prato 3");
    expect(s.peek()).toBe("Prato 2");
    expect(s.size()).toBe(2);
  });

  it("deve validar o algoritmo de parênteses válidos usando Stack", () => {
    function isValidParentheses(s: string): boolean {
      const stack: string[] = [];
      const map: Record<string, string> = { ")": "(", "}": "{", "]": "[" };
      for (const char of s) {
        if (["(", "{", "["].includes(char)) {
          stack.push(char);
        } else if (map[char]) {
          if (stack.pop() !== map[char]) return false;
        }
      }
      return stack.length === 0;
    }

    expect(isValidParentheses("()")).toBe(true);
    expect(isValidParentheses("()[]{}")).toBe(true);
    expect(isValidParentheses("{[()]}")).toBe(true);
    expect(isValidParentheses("(]")).toBe(false);
    expect(isValidParentheses("([)]")).toBe(false);
    expect(isValidParentheses("{[}")).toBe(false);
  });
});
