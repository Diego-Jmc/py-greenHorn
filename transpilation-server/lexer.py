import ply.lex as lex

tokens = [
    'NUMBER',
    'PLUS',
    'MINUS',
    'TIMES',
    'DIVIDE',
    'STRING',
    'ID',
    'ASSIGN',
    'LEFTPH',
    'RIGTHPH',
    'COMMA'
]

reserved = {
    'def': 'DEFINITION',
    'print': 'PRINT',
    'gen': 'GENERATOR',
    'for': 'FOR'
}

tokens += reserved.values()

# Simple token rules don't have to be defined as functions , they simply need a RE to work!

t_PLUS = r'\+'
t_MINUS = r'-'
t_TIMES = r'\*'
t_DIVIDE = r'/'
t_ASSIGN = r'\->'
t_LEFTPH = r'\('
t_RIGTHPH = r'\)'
t_COMMA = r','
t_ignore = ' \t\n'


def t_ID(t):
    r'[a-zA-Z_][a-zA-Z_0-9]*'
    t.type = reserved.get(t.value, 'ID')
    return t


def t_NUMBER(t):
    r'\d+'
    t.value = int(t.value)
    return t


def t_STRING(t):
    r'\"([^\\\n]|(\\.))*?\"'
    t.value = str(t.value[1:-1])
    return t


# Error handling rule
def t_error(t):
    print("Illegal character '%s'" % t.value[0])
    t.lexer.skip(1)


lexer = lex.lex()
