class CodeGenerator:
    defines_variables = {}

    def __init__(self, greenHorn_ast):
        self.greenHorn_ast = greenHorn_ast

    def is_exp_gen(self, exp):
        return isinstance(exp, tuple) and exp[0] == "generator"

    def gen_generator(self, generator_node, func_name):

        val = generator_node[4]
        output = f"""
        function* {func_name}() {{

            for (let {val} = {generator_node[1]}; {val} <= {generator_node[2]}; {val}++) {{

                yield {generator_node[3]};
            }}
        }}
        """
        return output

    def gen_print(self, print_node):

        output = f"console.log({print_node[1]})\n"
        return output

    def gen_vardef(self, def_node):
        output = ""

        if self.is_exp_gen(def_node[2]):
            output = self.gen_generator(def_node[2], def_node[1])
        else:
            output = f"let {def_node[1]} = {def_node[2]}\n"

        return output

    def generate_code(self):

        js_code = ""

        for node in self.greenHorn_ast:

            if node[0] == "assignation":
                js_code += self.gen_vardef(node)
            if node[0] == "print":
                js_code += self.gen_print(node)

        return js_code
